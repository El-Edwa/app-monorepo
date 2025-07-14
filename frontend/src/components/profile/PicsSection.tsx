import { useState, useRef } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import Cropper from "react-easy-crop";
import { Slider } from "@/components/ui/slider";

const PicsSection = ({ user, where }: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  
  // Cover picture states
  const [coverCrop, setCoverCrop] = useState({ x: 0, y: 0 });
  const [coverZoom, setCoverZoom] = useState(1);
  const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(null);
  const [isCoverDialogOpen, setIsCoverDialogOpen] = useState(false);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const [croppedCoverImage, setCroppedCoverImage] = useState<string | null>(null);

  const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    if (!selectedImage) return;

    const createImage = (url: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = url;
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
      });

    const getCroppedImg = async (
      imageSrc: string,
      pixelCrop: { x: number; y: number; width: number; height: number }
    ): Promise<string> => {
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Failed to get canvas context");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      return canvas.toDataURL("image/jpeg");
    };

    const croppedImg = await getCroppedImg(selectedImage, croppedAreaPixels);
    setCroppedImage(croppedImg);
  };

  const onCoverCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    if (!selectedCoverImage) return;

    const createImage = (url: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = url;
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
      });

    const getCroppedImg = async (
      imageSrc: string,
      pixelCrop: { x: number; y: number; width: number; height: number }
    ): Promise<string> => {
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Failed to get canvas context");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      return canvas.toDataURL("image/jpeg");
    };

    const croppedImg = await getCroppedImg(selectedCoverImage, croppedAreaPixels);
    setCroppedCoverImage(croppedImg);
  };
  
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
      event.target.value = "";
  };

  const handleCoverImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
      event.target.value = "";
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCoverFileInput = () => {
    coverFileInputRef.current?.click();
  };

   const imageForCropping =
    selectedImage ||
    user.profilePicture ||
    "https://res.cloudinary.com/doou4eolq/image/upload/v1708218358/sample.jpg";

  const coverImageForCropping =
    selectedCoverImage ||
    user.coverPicture ||
    "https://res.cloudinary.com/doou4eolq/image/upload/v1708218358/sample.jpg";

  return (
    <div className="w-full">
      <div
        className="w-full h-[200px] bg-cover bg-center relative"
        style={
          croppedCoverImage
            ? { backgroundImage: `url(${croppedCoverImage})` }
            : user.coverPicture
            ? { backgroundImage: `url(${user.coverPicture})` }
            : { backgroundColor: "#333639" }
        }
      >
        {/* Cover Picture Edit Overlay */}
        {where === "editProfile" && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center  transition-opacity cursor-pointer">
            {/* Hidden file input for cover */}
            <input
              type="file"
              ref={coverFileInputRef}
              onChange={handleCoverImageSelect}
              accept="image/*"
              style={{ display: "none" }}
            />

            <Dialog open={isCoverDialogOpen} onOpenChange={setIsCoverDialogOpen}>
              <DialogTrigger asChild>
                <MdOutlineAddAPhoto
                  className="text-white text-4xl bg-black/50 p-2 rounded-full hover:bg-black/30 cursor-pointer"
                  onClick={triggerCoverFileInput}
                />
              </DialogTrigger>

              {selectedCoverImage && (
                <DialogPortal>
                  <DialogOverlay className="fixed inset-0 bg-[#596e8140] z-50" />
                  <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[75vh] bg-black rounded-2xl z-50 flex flex-col md:max-w-[600px]">
                    <div className="flex justify-between px-4 py-2">
                      <div
                        className="flex gap-4 items-center"
                        onClick={() => {
                          setIsCoverDialogOpen(false);
                          setSelectedCoverImage(null);
                          setCroppedCoverImage(null);
                          setCoverCrop({ x: 0, y: 0 });
                          setCoverZoom(1);
                        }}
                      >
                        <DialogClose className="cursor-pointer hover:bg-white/10 rounded-full p-2 text-2xl ">
                          <FaArrowLeftLong />
                        </DialogClose>
                        <p className="font-bold text-2xl">Edit cover photo</p>
                      </div>
                      <Button
                        className=" rounded-3xl text-lg cursor-pointer hover:bg-white/85 font-semibold text-sm"
                        onClick={() => {
                          setSelectedCoverImage(null);
                          setIsCoverDialogOpen(false);
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                    <div className="flex-1 relative">
                      <Cropper
                        image={coverImageForCropping}
                        crop={coverCrop}
                        zoom={coverZoom}
                        aspect={16 / 9}
                        onCropChange={setCoverCrop}
                        onCropComplete={onCoverCropComplete}
                        onZoomChange={setCoverZoom}
                        showGrid={false}
                      />
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex justify-center items-center">
                        <div className="flex items-center gap-2">
                          <MdOutlineZoomOut
                            className="text-[#333639] text-2xl cursor-pointer"
                            onClick={() =>
                              setCoverZoom((prev) => Math.max(prev - 0.1, 1))
                            }
                          />
                          <Slider
                            className=" w-[300px] h-[4px] rounded-full bg-[#8eccf9]  "
                            value={[coverZoom]}
                            onValueChange={(value: number[]) =>
                              setCoverZoom(value[0])
                            }
                            min={1}
                            max={3}
                            step={0.01}
                          />
                          <MdOutlineZoomIn
                            className="text-[#333639] text-2xl cursor-pointer"
                            onClick={() => setCoverZoom((prev) => prev + 0.1)}
                          />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </DialogPortal>
              )}
            </Dialog>
          </div>
        )}

        <div className="bg-black w-[140px] h-[140px] rounded-full top-[130px] left-[17px] absolute">
          <img
            src={
            croppedImage || user.profilePicture ||
            "https://res.cloudinary.com/doou4eolq/image/upload/v1708218358/sample.jpg"
            }
            alt="Profile"
            className="w-[140px] h-[140px] rounded-full border-4 border-black"
          />

          {/* Hover Overlay for Edit Mode */}
          {where === "editProfile" && (
            <div className="bg-black/50 w-[140px] h-[140px] rounded-full absolute top-0 left-0 z-10 flex items-center justify-center cursor-pointer">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                style={{ display: "none" }}
              />

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                <DialogTrigger asChild>
                  <MdOutlineAddAPhoto
                    className="text-white text-3xl bg-black/50 p-1 rounded-full hover:bg-black/30 cursor-pointer"
                    onClick={triggerFileInput}
                  />
                </DialogTrigger>

          { selectedImage&& <DialogPortal>
                  <DialogOverlay className="fixed inset-0 bg-[#596e8140] z-50"/>
                  <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[75vh] bg-black rounded-2xl z-50 flex flex-col md:max-w-[600px]">
                    <div className="flex justify-between px-4 py-2">
                      <div className="flex gap-4 items-center"
                        onClick={() => {
                          setIsDialogOpen(false);
                          setSelectedImage(null);
                          setCroppedImage(null);
                          setCrop({ x: 0, y: 0 });
                          setZoom(1); 
                        }}
                      >
                        <DialogClose className="cursor-pointer hover:bg-white/10 rounded-full p-2 text-2xl ">
                          <FaArrowLeftLong />
                        </DialogClose>
                        <p className="font-bold text-2xl">Edit media</p>
                      </div>
                      <Button className=" rounded-3xl text-lg cursor-pointer hover:bg-white/85 font-semibold text-sm"
                        onClick={() => {
                          setSelectedImage(null);
                          setIsDialogOpen(false);
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                    <div className="flex-1 relative">
                      <Cropper
                        image={imageForCropping}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        showGrid={false}
                      />
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex justify-center items-center">
                        <div className="flex items-center gap-2">
                          <MdOutlineZoomOut
                            className="text-[#333639] text-2xl cursor-pointer"
                            onClick={() =>
                              setZoom((prev) => Math.max(prev - 0.1, 1))
                            }
                          />
                          <Slider
                            className=" w-[300px] h-[4px] rounded-full bg-[#8eccf9]  "
                            value={[zoom]}
                            onValueChange={(value: number[]) =>
                              setZoom(value[0])
                            }
                            min={1}
                            max={3}
                            step={0.01}
                          />
                          <MdOutlineZoomIn
                            className="text-[#333639] text-2xl cursor-pointer"
                            onClick={() => setZoom((prev) => prev + 0.1)}
                          />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </DialogPortal>}
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PicsSection;
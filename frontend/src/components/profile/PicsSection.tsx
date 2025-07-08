import { useState, useRef } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogPortal,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import Cropper from "react-easy-crop";
import { Slider } from "../ui/slider";

const PicsSection = ({ user, where }: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setIsDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Use the selected image for cropping, or fallback to existing profile picture
  const imageForCropping =
    selectedImage ||
    user.profilePicture ||
    "https://res.cloudinary.com/doou4eolq/image/upload/v1708218358/sample.jpg";

  return (
    <div className="w-full">
      <div
        className="w-full h-[200px] bg-cover bg-center relative"
        style={
          user.coverPicture
            ? { backgroundImage: `url(${user.coverPicture})` }
            : { backgroundColor: "#333639" }
        }
      >
        <div className="bg-black w-[140px] h-[140px] rounded-full top-[130px] left-[17px] absolute">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : "https://res.cloudinary.com/doou4eolq/image/upload/v1708218358/sample.jpg"
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

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <MdOutlineAddAPhoto
                    className="text-white text-3xl bg-black/50 p-1 rounded-full hover:bg-black/30 cursor-pointer"
                    onClick={triggerFileInput}
                  />
                </DialogTrigger>

                <DialogPortal>
                  <DialogOverlay className="fixed inset-0 bg-[#596e8140] z-50" />
                  <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[90vh] bg-black rounded-2xl z-50 flex flex-col">
                    <div className="flex justify-between px-4 py-2">
                      <div className="flex gap-4 items-center">
                        <DialogClose className="cursor-pointer hover:bg-white/10 rounded-full p-2 text-2xl ">
                          <FaArrowLeftLong />
                        </DialogClose>
                        <p className="font-bold text-2xl">Edit media</p>
                      </div>
                      <Button className=" rounded-3xl text-lg cursor-pointer hover:bg-white/85 font-semibold text-sm">
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
                            max={100}
                            step={1}
                          />
                          <MdOutlineZoomIn
                            className="text-[#333639] text-2xl cursor-pointer"
                            onClick={() => setZoom((prev) => prev + 0.1)}
                          />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </DialogPortal>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PicsSection;

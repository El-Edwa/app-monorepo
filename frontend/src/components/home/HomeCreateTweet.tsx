import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CiImageOn } from "react-icons/ci";
import { HiOutlineGif } from "react-icons/hi2";
import { GrEmoji } from "react-icons/gr";
import GifPicker, { Theme } from "gif-picker-react";

interface GifObject {
  url: string;
}

export default function HomeCreateTweet({
  textareaRef,
  fileInputRef,
  allMediaItems,
  removeFile,
  showGifPicker,
  setShowGifPicker,
  handleGifSelect,
  tweetContent,
  setTweetContent,
  imagePickHandler,
  gifPickHandler,
  handleFileChange,
}: {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  allMediaItems: { url: string; index: number }[];
  removeFile: (index: number) => void;
  showGifPicker: boolean;
  setShowGifPicker: React.Dispatch<React.SetStateAction<boolean>>;
  handleGifSelect: (gif: GifObject) => void;
  tweetContent: string;
  setTweetContent: React.Dispatch<React.SetStateAction<string>>;
  imagePickHandler: () => void;
  gifPickHandler: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col items-center w-full p-4 border-b border-neutral-800 relative">
      <div className="flex items-start gap-4 w-full">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src="https://content.imageresizer.com/images/memes/Badass-Skeleton-meme-2d5o0i.jpg"
            alt="User Avatar"
          />
          <AvatarFallback className="bg-neutral-800 text-neutral-500">
            S
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            name="tweet"
            id="tweet"
            placeholder="What's happening?"
            className="mt-1 w-full resize-none bg-transparent border-none outline-none text-gray-200 placeholder-neutral-500 text-xl min-h-[40px] overflow-hidden"
            dir="auto"
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            rows={1}
          />
          {allMediaItems.length > 0 && (
            <div className="mt-3 w-full max-w-2xl">
              <Carousel className="w-full max-w-2xl">
                <CarouselContent>
                  {allMediaItems.map((item, index) => (
                    <CarouselItem key={index} className="sm:basis-1/2">
                      <div className="relative">
                        <img
                          src={item.url}
                          alt={`Selected ${index + 1}`}
                          className="w-full h-64 object-cover rounded-2xl border border-neutral-700"
                        />
                        <button
                          onClick={() => removeFile(item.index)}
                          className="absolute top-2 right-2 bg-black/80 rounded-full px-2 py-0.5 text-white cursor-pointer hover:bg-opacity-90 transition-colors"
                        >
                          ✕
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black rounded-full px-2 py-1 text-white text-sm">
                          {index + 1} / {allMediaItems.length}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {allMediaItems.length > 1 && (
                  <>
                    <CarouselPrevious className="left-2 text-white border-neutral-600 hover:bg-opacity-90" />
                    <CarouselNext className="right-2 text-white border-neutral-600 hover:bg-opacity-90" />
                  </>
                )}
              </Carousel>
            </div>
          )}
        </div>
      </div>

      {/* GIF Picker Modal */}
      {showGifPicker && (
        <Dialog open={showGifPicker} onOpenChange={setShowGifPicker}>
          <DialogTrigger asChild>
            <button className="hidden"></button>
          </DialogTrigger>
          <DialogContent className="bg-[#222222] shadow-lg shadow-[#888888]">
            <DialogHeader>
              <DialogTitle>Select a GIF</DialogTitle>
              <DialogDescription>
                Choose a GIF to add to your tweet.
              </DialogDescription>
            </DialogHeader>
            <GifPicker
              onGifClick={handleGifSelect}
              tenorApiKey={import.meta.env.VITE_TENOR_API_KEY}
              width="100%"
              height="400px"
              theme={Theme.DARK}
            />
            <DialogFooter>
              <DialogClose asChild>
                <button className="bg-white text-black px-4 py-2 rounded-full cursor-pointer">
                  Close
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="flex justify-between items-center w-5/6 mt-2">
        <div className="flex gap-3">
          {/* Hidden file input for images */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />
          <CiImageOn
            size={"1.8em"}
            className="cursor-pointer text-blue-500 p-1 rounded-full hover:bg-blue-500/20 transition-colors duration-200"
            onClick={imagePickHandler}
          />
          <HiOutlineGif
            size={"1.8em"}
            className="cursor-pointer text-blue-500 p-1 rounded-full hover:bg-blue-500/20 transition-colors duration-200"
            onClick={gifPickHandler}
          />
          <GrEmoji
            size={"1.8em"}
            className="cursor-pointer text-blue-500 p-1 rounded-full hover:bg-blue-500/20 transition-colors duration-200"
          />
        </div>
        <button className="bg-white cursor-pointer text-black px-4 py-2 rounded-full font-bold hover:bg-neutral-200 transition-colors duration-200">
          Post
        </button>
      </div>
    </div>
  );
}

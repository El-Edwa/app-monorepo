import { IoIosMore } from "react-icons/io";

export default function NavbarUser() {
  return (
    <div className="flex justify-between items-start px-3 py-3 cursor-pointer hover:bg-neutral-900 rounded-full transition-colors duration-200">
      <div className="flex items-center gap-2">
        <img
          src="https://content.imageresizer.com/images/memes/Badass-Skeleton-meme-2d5o0i.jpg"
          alt="user"
          className="w-12 h-12 rounded-full object-cover cursor-pointer"
        />
        <div className="hidden xl:block">
          <p className="font-bold">Skeleton</p>
          <p className="text-neutral-500 text-sm">@death</p>
        </div>
      </div>
      <IoIosMore
        size={"1.5em"}
        className="hidden xl:block ml-4 mt-4 cursor-pointer"
      />
    </div>
  );
}

import { IoIosMore } from "react-icons/io";

export default function NavbarUser() {
  return (
    <div className="flex justify-between sm:ml-3 items-start py-3 gap-8 cursor-pointer">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {/* User Image */}
        <img
          src="https://content.imageresizer.com/images/memes/Badass-Skeleton-meme-2d5o0i.jpg"
          alt="user"
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        {/* User Name and Handle */}
        <div className="hidden xl:block min-w-0 flex-1">
          <p className="font-bold truncate">Skeleton</p>
          <p className="text-neutral-500 text-sm truncate">@death</p>
        </div>
      </div>
      <IoIosMore size={"1.5em"} className="hidden xl:block ml-4 mt-4 flex-shrink-0" />
    </div>
  );
}

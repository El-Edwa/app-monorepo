import { Outlet } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import NavbarItems from "@/components/layouts/NavbarItems";
import { FaFeatherAlt } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

export default function RootLayout() {
  return (
    <main className="grid grid-cols-6 grid-rows-6">
      <nav className="row-span-6 col-start-1 col-span-2 xl:col-span-1 xl:col-start-2 py-4 sm:px-4 flex flex-col justify-between h-screen border-r border-neutral-800 justify-self-center-safe xl:justify-self-start">
        <div>
          <BsTwitterX size={"2em"} className="ml-4 mb-4" />
          <NavbarItems />
          <button className="mt-4 p-2 ml-3.5 xl:ml-0 xl:w-full bg-white text-black rounded-full flex items-center justify-center gap-2 cursor-pointer hover:bg-neutral-200 transition-colors duration-200">
            <span className="hidden xl:inline text-xl font-bold">Post</span>
            <FaFeatherAlt size={"1.3em"} className="block xl:hidden" />
          </button>
        </div>
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
      </nav>
      <section className="col-span-4 xl:col-span-2 row-span-6 col-start-3 xl:col-start-3">
        <Outlet />
      </section>
      <section className="hidden xl:block row-span-6 col-start-4 xl:col-start-5 col-span-2 p-7">
        Search and What's happening section
      </section>
    </main>
  );
}

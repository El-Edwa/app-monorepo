import { Outlet } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import NavbarItems from "@/components/layouts/NavbarItems";
import { FaFeatherAlt } from "react-icons/fa";
import NavbarUser from "@/components/layouts/NavbarUser";

export default function RootLayout() {
  return (
    <main className="grid grid-cols-6 grid-rows-6">
      {/* Sidebar */}
      <nav className="row-span-6 col-start-1 col-span-2 xl:col-span-1 xl:col-start-2 py-4 sm:px-4 flex flex-col justify-between h-full border-r border-neutral-800 justify-self-center-safe xl:justify-self-start w-full">
        <div>
          <BsTwitterX size={"1.7em"} className="ml-4 mb-4" />
          <NavbarItems />
          <button className="mt-4 p-3 ml-3.5 xl:ml-0 xl:w-full bg-white text-black rounded-full flex items-center justify-center gap-2 cursor-pointer hover:bg-neutral-200 transition-colors duration-200">
            <span className="hidden xl:inline text-lg font-bold">Post</span>
            <FaFeatherAlt size={"1.3em"} className="block xl:hidden" />
          </button>
        </div>
        <NavbarUser />
      </nav>

      {/* The main content */}
      <section className="col-span-4 xl:col-span-2 row-span-6 col-start-3">
        <Outlet />
      </section>

      {/*Search and What's happening Sidebar */}
      <section className="hidden xl:block row-span-6 col-start-4 xl:col-start-5 col-span-2 p-7">
        Search and What's happening section
      </section>
    </main>
  );
}

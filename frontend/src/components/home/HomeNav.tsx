import type { Dispatch, SetStateAction } from "react";

type ActiveTab = "forYou" | "following";

interface HomeNavProps {
  activeTab: ActiveTab;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
}

export default function HomeNav({ activeTab, setActiveTab }: HomeNavProps) {
  return (
    <nav className="flex sticky top-0 z-10 items-end w-full backdrop-blur-md border-b border-neutral-800">
      <button
        onClick={() => setActiveTab("forYou")}
        className="flex flex-col gap-2 w-1/2 pt-4 cursor-pointer hover:bg-neutral-900 transition-colors duration-300"
      >
        <p
          className={`text-center transition-all duration-300 ${
            activeTab === "forYou" ? "font-bold" : "text-gray-500"
          }`}
        >
          For You
        </p>
        {/* blue indicator with animation */}
        <div
          className={`w-20 rounded-3xl h-1 mx-auto transform transition-all duration-300 ease-in-out ${
            activeTab === "forYou"
              ? "bg-blue-500 scale-100 opacity-100"
              : "bg-transparent scale-0 opacity-0"
          }`}
        ></div>
      </button>
      <button
        onClick={() => setActiveTab("following")}
        className="flex flex-col gap-2 w-1/2 pt-4 cursor-pointer hover:bg-neutral-900 transition-colors duration-300"
      >
        <p
          className={`text-center transition-all duration-300 ${
            activeTab === "following" ? "font-bold" : "text-gray-500"
          }`}
        >
          Following
        </p>
        {/* blue indicator with animation */}
        <div
          className={`w-20 rounded-3xl h-1 mx-auto transform transition-all duration-300 ease-in-out ${
            activeTab === "following"
              ? "bg-blue-500 scale-100 opacity-100"
              : "bg-transparent scale-0 opacity-0"
          }`}
        ></div>
      </button>
    </nav>
  );
}

import { useState } from "react";

const Sections = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  const tabs = ["Posts", "Replies", "Media", "Likes"];

  return (
    <div className="w-full border-b ">
      <div className="flex overflow-x-auto scrollbar-hide w-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-shrink-0 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors duration-200 relative cursor-pointer hover:bg-white/5
              flex-1 text-[#676d70] `}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/4 right-0 h-1 w-1/2 bg-[#1d9af1]"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sections;

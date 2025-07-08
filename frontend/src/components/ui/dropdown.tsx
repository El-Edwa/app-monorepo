import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface DropdownProps {
  label?: string;
  array: string[];
  className?: string;
}

const Dropdown = ({ label, array, className = "" }: DropdownProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(array[0]);
  return (
    <div className={`flex flex-col gap-2 py-4 ${className}`}>
      <div
        className={`relative w-full h-[60px] border ${
          isFocused ? "border-[#1D9BF0]" : "border-[#4d5155]"
        } rounded-md`}
      >
        <div
          className={`absolute right-2 top-1/2 -translate-y-1/2 transform text-[#4d5155] ${
            isFocused ? "text-[#1D9BF0]" : ""
          } transition-all duration-300 linear text-3xl`}
          style={{ pointerEvents: "none" }}
        >
          <MdKeyboardArrowDown
            className={` ${isFocused ? "text-[#1D9BF0]" : ""}`}
          />
        </div>
        <div
          className={`absolute transform px-2 py-1 h-full transition-all duration-300 linear`}
        >
          {label && (
            <label
              className={`transition-all duration-300 ease-in-out origin-left text-xs font-semibold ${
                isFocused ? "text-[#1D9BF0]  " : "text-[#4d5155] "
              }  `}
            >
              {label}
            </label>
          )}
        </div>

        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full h-full bg-black text-[#fff] outline-none rounded-2xl p-[8px] pt-[20px] "
          style={{
            appearance: "none",
          }}
        >
          {array.map((item: string, index: number) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default Dropdown;

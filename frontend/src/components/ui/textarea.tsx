import { useState } from "react";
interface TextareaProps {
  label?: string;
  max?: number;
  min?: number;
}
const Textarea = ({ label, max }: TextareaProps) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (max && event.target.value.length > max) {
      return; // Prevent textarea if max is reached
    }
    setValue(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <div
        className={`relative w-full h-fit border ${
          isFocused || value ? "border-[#1D9BF0]" : "border-[#4d5155]"
        } rounded-md`}
      >
        <div
          className={`absolute transform px-2 py-1 h-full max-h-[60px] ${
            isFocused || value ? "" : "flex justify-center items-center"
          } transition-all duration-300 linear`}
        >
          {label && (
            <label
                  className={`transition-all duration-300 ease-in-out origin-left ${
                isFocused 
                  ? "text-[#1D9BF0]"
                  : "text-[#4d5155]"
              }
              ${
                value? "text-xs":""
              }
              `}
            >
              {label}
            </label>
          )}
        </div>
        {isFocused && (
          <div>
            <span
              className={`absolute right-2 top-1 transform   text-[#4d5155]  `}
            >
              {value.length}/{max || "∞"}
            </span>
          </div>
        )}
        <textarea
          rows={3}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="outline-none mt-5 rounded-md p-2 focus:outline-none w-full text-white text-xl"
        />
      </div>
    </div>
  );
};

export default Textarea;

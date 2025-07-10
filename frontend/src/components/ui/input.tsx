import { useState, useEffect, Fragment } from "react";

const Input = ({ label, max, min, required = false }: any) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (max && event.target.value.length > max) {
      return; // Prevent input if max is reached
    }
    setValue(event.target.value);
  };
  useEffect(() => {
    if (required && touched && value.length === 0) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [value, touched, required]);
  return (
    <div className="flex flex-col gap-2 p-4">
      <div
        className={`relative w-full h-[60px] border ${
          isFocused || value ? "border-[#1D9BF0]" : "border-[#4d5155]"
        }
          ${hasError ? "border-red-400" : ""} 
        rounded-md`}
      >
        <div
          className={`absolute transform px-2 py-1 h-full ${
            isFocused || value ? "" : "flex justify-center items-center"
          } transition-all duration-300 linear`}
        >
          {label && (
            <label
              className={`transition-all duration-300 ease-in-out origin-left ${
                isFocused || value
                  ? "text-[#1D9BF0] scale-75 text-xs"
                  : "text-[#4d5155] scale-100 text-md"
              }
              ${hasError ? "text-red-400" : ""}
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
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setTouched(true);
          }}
          className="outline-none mt-2.5 rounded-md  focus:outline-none w-full text-white text-xl p-[8px] pt-[12px]"
        />
      </div>
      {required && value.length === 0 && touched && (
        <span className="text-xs text-red-400">{label} can't be empty</span>
      )}
    </div>
  );
};

export default Input;

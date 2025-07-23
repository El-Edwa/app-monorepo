import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdKeyboardArrowRight } from "react-icons/md";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Dropdown from "@/components/ui/dropdown";
interface BirthDaySectionProps {
  user: {
    birthday?: string | Date | null;
  };
 
}

const BirthDatySection = ({ user }: BirthDaySectionProps) => {
  const [editable, setEditable] = useState(false);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (editable) {
    return (
      <div>
        <div className="text-md text-start px-4 flex items-center gap-1">
          <label>Birth date</label>
          <span className=" font-bold text-gray-600 ">.</span>
          <span
            className="text-[#1D9BF0] text-sm hover:underline cursor-pointer items-center"
            onClick={() => setEditable(false)}
          >
            Cancel
          </span>
        </div>
        <div className="text-sm text-start px-4 text-[#4d5155]">
          This should be the date of birth of the person using the account. Even
          if you’re making an account for your business, event, or cat.
        </div>
        <div className="flex flex-col px-4">
          <div className="flex justify-between items-center w-full gap-2">
            <Dropdown label="Month" array={months} className="flex-[2]" />
            <Dropdown
              label="Day"
              className="flex-1"
              array={Array.from({ length: 31 }, (_, i) => (i + 1).toString())}
            />
            <Dropdown
              label="Year"
              className="flex-1"
              array={Array.from({ length: 100 }, (_, i) =>
                (new Date().getFullYear() - i).toString()
              )}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Dialog>
        <DialogTrigger>
          <div className="flex justify-between items-center hover:bg-white/10 p-4">
            <div>
              <p className="text-md text-start">Birth date</p>
              <p>
                {user.birthday
                  ? format(new Date(user.birthday), "MMMM d, yyyy")
                  : "Not set"}
              </p>
            </div>
            <MdKeyboardArrowRight className="text-[#333639] text-3xl" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[280px] sm:max-h-[320px] p-[32px] rounded-2xl flex flex-col gap-4">
          <div className="flex flex-col gap-1 ">
            <h1 className="font-semibold text-lg">Edit date of birth?</h1>
            <p className="text-sm text-[#676d70]">
              This can only be changed a few times. Make sure you enter the age
              of the person using the account.
            </p>
          </div>
          <div className="flex flex-col gap-2 ">
            <Button
              className="rounded-full cursor-pointer"
              onClick={() => {
                setEditable(true);
              }}
            >
              <DialogClose>Edit</DialogClose>
            </Button>
            <Button
              className="rounded-full bg-black text-white hover:bg-white/10 border border-gray-300 cursor-pointer"
              
            >
              <DialogClose>Cancel</DialogClose>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
};

export default BirthDatySection;

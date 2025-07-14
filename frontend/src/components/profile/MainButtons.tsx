import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoMdClose } from "react-icons/io";
import EditProfileForm from "@/components/profile/EditProfileForm";

const MainButtons = ({ user }: any) => {
  return (
    <div className="flex justify-end w-full h-[70px]">
      <Dialog>
        <DialogTrigger>
          <Button className="bg-black text-white border px-[16px] border-gray-300 rounded-3xl">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="[&>button]:hidden rounded-2xl sm:max-w-[600px] h-[75vh]  ">
          <div className="flex justify-between px-4 py-2">
            <div className="flex gap-4 items-center">
              <DialogClose className="cursor-pointer hover:bg-white/10 rounded-full p-2 text-2xl ">
                <IoMdClose />
              </DialogClose>
              <p className="font-bold text-2xl">Edit Profile</p>
            </div>
            <Button className=" rounded-3xl text-lg cursor-pointer hover:bg-white/85">
              Save
            </Button>
          </div>
          <EditProfileForm user={user} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default MainButtons;

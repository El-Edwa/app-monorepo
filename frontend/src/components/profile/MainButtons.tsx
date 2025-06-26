import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const MainButtons = () => {
  return (
    <div className="flex justify-end w-full  h-[70px]">
      <Dialog>
        <DialogTrigger>
          <Button className="bg-black text-white border px-[16px] border-gray-300 rounded-3xl">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogOverlay className="bg-[#596e8140]" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default MainButtons;

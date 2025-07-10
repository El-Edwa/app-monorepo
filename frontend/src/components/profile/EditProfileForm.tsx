import Input from "../ui/input";
import Textarea from "../ui/textarea";
import BirthDatySection from "./BirthDaySection";
import { useState } from "react";
import PicsSection from "./PicsSection";
const EditProfileForm = ({ user }: any) => {
  const [EditingBirthday, setEditingBirthday] = useState(false);
  const setEditingBirthdayFunc = (vlu: boolean) => {
    setEditingBirthday(vlu);
  };
  return (
    <form className="flex flex-col  w-full  overflow-y-auto">
      <div className="mb-18">
        <PicsSection user={user} where={"editProfile"} />
      </div>
      <Input label="Name" max={50} min={1} required={true} />
      <Textarea label="Bio" max={160} min={1} />
      <Input label="Location" max={30} min={1} />
      <Input label="Website" max={100} min={1} />

      <BirthDatySection
        user={user}
        setEditingBirthday={setEditingBirthdayFunc}
      />
    </form>
  );
};
export default EditProfileForm;

import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import BirthDatySection from "@/components/profile/BirthDaySection";
import PicsSection from "@/components/profile/PicsSection";
const EditProfileForm = ({ user }: any) => {
  return (
    <form className="flex flex-col w-[600px] overflow-y-auto">
      <div className="mb-18">
        <PicsSection user={user} where={"editProfile"} />
      </div>
      <Input label="Name" max={50} min={1} required={true} />
      <Textarea label="Bio" max={160} min={1} />
      <Input label="Location" max={30} min={1} />
      <Input label="Website" max={100} min={1} />

      <BirthDatySection
        user={user}

      />
    </form>
  );
};
export default EditProfileForm;

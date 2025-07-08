import PicsSection from "@/components/profile/PicsSection";
import MainButtons from "@/components/profile/MainButtons";
import InfoSection from "@/components/profile/InfoSection";
import Sections from "@/components/profile/Sections";
import SuggestedPeopleList from "@/components/root/whoToFollow/SuggestedPeopleList";
const profilePage = () => {
  const user = {
    name: "Ahmed Mohsen",
    username: "@ahmedmohsen",
    createdAt: "2023-10-01T12:00:00Z",
    profilePicture: null,
    coverPicture: null,
    bio: "Software Engineer with a passion for building web applications.",
    location: "Cairo, Egypt",
    website: "https://ahmedmohsen.dev",
    followers: 1500,
    following: 300,
    posts: 75,
    birthday: "1990-01-01",
    proffession: "Software Engineer",
  };
  return (
    <div className="w-[600px] flex flex-col items-center">
      <PicsSection user={user} />
      <div className="px-[16px] pt-[12px] w-full">
        <MainButtons user={user} />
        <InfoSection user={user} />
      </div>
      <Sections />
      <SuggestedPeopleList />
    </div>
  );
};
export default profilePage;

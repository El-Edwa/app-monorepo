import ProfileCardHover from "./ProfileCardHover";
import SuggestedPeopleListItem from "./suggestedPeopleListItem";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
const users = [
  {
    id: 1,
    name: "Sara Khaled",
    username: "@sarakhaled",
    createdAt: "2023-08-12T09:30:00Z",
    profilePicture: null,
    coverPicture: null,
    bio: "Frontend Developer and design enthusiast.",
    location: "Alexandria, Egypt",
    website: "https://sarak.dev",
    followers: 980,
    following: 210,
    posts: 48,
    birthday: "1994-05-20",
    proffession: "Frontend Developer",
  },
  {
    id: 2,
    name: "Youssef El-Sayed",
    username: "@youssefelsayed",
    createdAt: "2024-01-22T14:15:00Z",
    profilePicture: null,
    coverPicture: null,
    bio: "Backend Developer who loves clean code.",
    location: "Giza, Egypt",
    website: "https://youssef.dev",
    followers: 1120,
    following: 330,
    posts: 60,
    birthday: "1991-11-10",
    proffession: "Backend Developer",
  },
  {
    id: 3,
    name: "Laila Mostafa",
    username: "@lailamostafa",
    createdAt: "2023-11-05T08:45:00Z",
    profilePicture: null,
    coverPicture: null,
    bio: "Full Stack Developer | Coffee lover ☕",
    location: "Mansoura, Egypt",
    website: "https://lailadev.com",
    followers: 2040,
    following: 510,
    posts: 97,
    birthday: "1993-02-14",
    proffession: "Full Stack Developer",
  },
];
const SuggestedPeopleList = () => {
  return (
    <div className="w-full">
      <h2 className="  font-semibold text-white text-xl p-[12px]">
        Who to follow
      </h2>
      <div className="flex flex-col gap-3 w-full">
        {users.map((user) => (
          <HoverCard key={user.id}>
            <HoverCardTrigger>
              <SuggestedPeopleListItem user={user} />
            </HoverCardTrigger>
            <HoverCardContent>
              <ProfileCardHover user={user} />
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPeopleList;

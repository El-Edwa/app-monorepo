import { NavLink } from "react-router-dom";
import { GoHomeFill, GoHome } from "react-icons/go";
import { CiSearch, CiUser, CiBookmark, CiMail } from "react-icons/ci";
import { HiOutlineBell, HiBell } from "react-icons/hi2";
import { RiBookmarkFill } from "react-icons/ri";

interface NavbarItemProps {
  name: string;
  to: string;
}

export default function NavbarItem({ name, to }: NavbarItemProps) {
  const getIcon = (itemName: string, isActive: boolean) => {
    const iconProps = { size: "1.7em" };

    switch (itemName) {
      case "Home":
        return isActive ? (
          <GoHomeFill {...iconProps} />
        ) : (
          <GoHome {...iconProps} />
        );
      case "Explore":
        return <CiSearch {...iconProps} />;
      case "Notifications":
        return isActive ? (
          <HiBell {...iconProps} />
        ) : (
          <HiOutlineBell {...iconProps} />
        );
      case "Messages":
        return <CiMail {...iconProps} />;
      case "Bookmarks":
        return isActive ? (
          <RiBookmarkFill {...iconProps} />
        ) : (
          <CiBookmark {...iconProps} />
        );
      case "Profile":
        return <CiUser {...iconProps} />;
      default:
        return <GoHome {...iconProps} />;
    }
  };

  return (
    <li className="py-2 px-4 mt-4 hover:bg-neutral-800 rounded-full transition-colors duration-200">
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "flex gap-3 items-end font-bold" : "flex gap-3 items-end"
        }
      >
        {({ isActive }) => (
          <>
            {getIcon(name, isActive)}
            <span className="md:text-xl xl:block hidden">{name}</span>
          </>
        )}
      </NavLink>
    </li>
  );
}

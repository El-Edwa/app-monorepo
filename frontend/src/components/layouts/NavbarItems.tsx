import NavbarItem from "./NavbarItem";

export default function NavbarItems() {
  const navItems = [
    { name: "Home", to: "/" },
    { name: "Explore", to: "/explore" },
    { name: "Notifications", to: "/notifications" },
    { name: "Messages", to: "/messages" },
    { name: "Bookmarks", to: "/bookmarks" },
    { name: "Profile", to: "/profile" },
  ];

  return (
    <ul className="w-fit">
      {navItems.map((item) => (
        <NavbarItem key={item.name} name={item.name} to={item.to} />
      ))}
    </ul>
  );
}

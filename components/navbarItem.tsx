import React from "react";

interface NavbarItemProps {
  // Define any props you need
  label: string;
};

const NavbarItem: React.FC<NavbarItemProps> = ({
  label
}) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};
export default NavbarItem;
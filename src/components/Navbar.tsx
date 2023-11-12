"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const currentRoute = usePathname();

  return (
    <header className="header">
      <Link
        href={"/"}
        className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md hover:opacity-80 duration-300"
      >
        <p className="blue-gradient_text">MA</p>
      </Link>
      <nav className="flex text-lg gap-7 font-medium">
        <Link
          href={"/about"}
          className={`hover:opacity-80 duration-300 ${
            currentRoute === "/about" ? "text-blue-500" : "text-black"
          }`}
        >
          About
        </Link>
        <Link
          href={"/projects"}
          className={`hover:opacity-80 duration-300 ${
            currentRoute === "/projects" ? "text-blue-500" : "text-black"
          }`}
        >
          Project
        </Link>
        <Link
          href={"/contact"}
          className={`hover:opacity-80 duration-300 ${
            currentRoute === "/contact" ? "text-blue-500" : "text-black"
          }`}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

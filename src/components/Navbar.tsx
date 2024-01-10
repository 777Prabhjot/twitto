import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import Link from "next/link";
import { DropDown } from "./DropDown";
import MobileSideBar from "./MobileSideBar";

const Navbar = () => {
  return (
    <header className="w-full flex items-center justify-between h-12 py-4 pt-8 pl-5 md:relative">
      {/*Logo*/}
      <Link href={"/"} className="lg:hidden">
        <Image
          className="bg-white rounded-xl"
          src={logo}
          width={40}
          height={40}
          alt="logo"
        />
      </Link>
      <div className="hidden lg:block">
        <MobileSideBar />
      </div>
      <div className="me-9 md:fixed md:top-[15px] md:right-[10px] md:z-50">
        <DropDown />
      </div>
    </header>
  );
};

export default Navbar;

import Link from "next/link";
import React from "react";
import CartButton from "../CartButton/CartButton";

const Navbar = () => {
  return (
    <div dir="rtl" className=" bg-blue-400 p-4 rounded-b-lg flex">
      <nav className="flex w-full justify-between ">
        <ul className="flex text-xl font-medium gap-6">
          <Link className="nav-hover" href={"./"}>
            <li> خانه</li>
          </Link>
          <Link href={"./"} className="nav-hover">
            <li>تماس باما</li>
          </Link>
          <li>
            <Link className="nav-hover" href={"/AboutUs"}>
              درباره ما
            </Link>
          </li>
          <Link className="nav-hover" href={"/shop"}>
            <li>خرید</li>
          </Link>
          <Link className="nav-hover" href={"/login"}>
            <li> ثبت نام / ورود</li>
          </Link>
        </ul>
        <ul>
            <CartButton/>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

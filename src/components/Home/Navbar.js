"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: 1, title: "Home", route: "/" },
  { id: 2, title: "About", route: "/about" },
  { id: 3, title: "Contact", route: "/contact_us" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="w-full h-[165px] flex justify-between items-center px-10">
      <section>
        {/* Logo */}
        <Image
          src="/assets/home/logo.png"
          alt="Nav_Logo"
          width={130}
          height={100}
          className="object-cover"
        />
      </section>

      {/* Menu */}
      <ul className="flex justify-center items-center gap-10">
        {navItems.map((item, index) => {
          return (
            <li
              key={index.toString()}
              className={`text-[20px] tracking-wide font-jost transition-all font-[600]
                ${
                  pathname === item.route
                    ? "text-mainPrimary"
                    : "text-[#000000]"
                }
              `}
            >
              <Link href={item.route}>{item.title.toUpperCase()}</Link>
            </li>
          );
        })}

        {/* Button */}
        <li className="py-2 px-7 border-2 rounded-[10px] flex justify-center items-center border-mainPrimary text-[20px] font-jost font-[500] text-mainPrimary hover:text-backgroundPrimary hover:bg-mainPrimary transition-all duration-700 cursor-pointer tracking-wide">
          <Link href={"/signup"}>SIGN UP</Link>
        </li>

        <li className="py-2 px-7 border-2 rounded-[10px] flex justify-center items-center border-mainPrimary text-[20px] font-jost font-[500] text-backgroundPrimary bg-mainPrimary hover:text-mainPrimary hover:bg-backgroundPrimary hover:border-mainPrimary transition-all duration-700 cursor-pointer tracking-wide">
          <Link href={"/login"}>LOGIN</Link>
        </li>
      </ul>
    </nav>
  );
}

"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";
import { useState } from "react";
import { Menu } from "lucide-react";

const Topbar = () => {
  const pathname = usePathname();

  const [dropdownMenu, setDropdownMenu] = useState(false);

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image src="/logo.png" alt="logo" width={120} height={70} />

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-base-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-5 items-center">
        <Menu className="text-grey-1 cursor-pointer md:hidden" onClick={() => setDropdownMenu(!dropdownMenu)} />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white rounded-lg shadow-xl">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className={`flex gap-4 text-body-medium ${
                  pathname === link.url ? "text-blue-1" : "text-grey-1"
                }`}
              >
                {link.icon}
                <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default Topbar;

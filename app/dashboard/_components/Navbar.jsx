"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter()
  return (
    <div className="flex  w-full justify-between items-center py-6 bg-secondary shadow-sm border-b px-4 md:px-20">
      <Image src={"/logo.svg"} width={40} height={40} />
      <ul className="hidden md:flex items-center gap-6 ">
        <li
        onClick={()=>{
          router.push('/dashboard')
        }}
          className={`${
            pathname == "/dashboard" && " font-medium text-primary  "
          } cursor-pointer hover:text-primary hover:font-medium duration-300 ease-in-out`}
        >
          Dashboard
        </li>
        <li
          className={`cursor-pointer hover:text-primary hover:font-medium duration-300 ease-in-out`}
        >
          Questions
        </li>
        <li
          className={`cursor-pointer hover:text-primary hover:font-medium duration-300 ease-in-out`}
        >
          Upgrade
        </li>
        <li
          className={`cursor-pointer hover:text-primary hover:font-medium duration-300 ease-in-out`}
        >
          How it Works?
        </li>
      </ul>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default Navbar;

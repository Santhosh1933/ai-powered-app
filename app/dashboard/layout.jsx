"use client";
import Navbar from "@/app/dashboard/_components/Navbar";
import React from "react";
import { RecoilRoot } from "recoil";

function DashBoardLayout({ children }) {
  return (
    <RecoilRoot>
      <div>
        <Navbar />
        <div className="py-8 max-w-6xl mx-auto w-[90%]">{children}</div>
      </div>
    </RecoilRoot>
  );
}

export default DashBoardLayout;

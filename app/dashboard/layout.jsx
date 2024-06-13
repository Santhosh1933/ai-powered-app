import Navbar from "@/app/dashboard/_components/Navbar";
import React from "react";

function DashBoardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="py-8 max-w-6xl mx-auto w-[90%]">{children}</div>
    </div>
  );
}

export default DashBoardLayout;

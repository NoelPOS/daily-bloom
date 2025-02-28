import React from "react";

export function Card({ children }) {
  return (
    <div className="rounded-[10px] bg-[#FFFFFF] bg-opacity-95 shadow-inner flex justify-center items-center w-[30%] py-5">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className=" ">{children}</div>;
}

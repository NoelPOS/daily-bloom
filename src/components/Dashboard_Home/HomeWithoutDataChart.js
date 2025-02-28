"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const RadialChart = dynamic(
  () => import("@/components/Dashboard_Home/HomePieChart"),
  {
    ssr: false,
  }
);

export default function WithoutData() {
  return (
    <div className="flex flex-col justify-start items-start">
      {/* Empty Progress Indicators || Pie Chart */}
      <div className="w-auto h-auto flex flex-wrap justify-start items-start gap-10">
        <RadialChart />
        <RadialChart />
        <RadialChart />
      </div>
    </div>
  );
}

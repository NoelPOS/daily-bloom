"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function DonutPieWithData({ data, percentage }) {
  // Conditional logic: you can modify this condition based on your requirements
  // For example, if the percentage is not 'This Month', show it

  const showPercentage = data && data.length > 0 && percentage !== "This Month";

  return (
    <div className="relative w-[201.24px] h-[201.24px] ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            cornerRadius={50} // Smooth edges
            paddingAngle={-10}
            barSize={22}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Conditionally render percentage */}
        {showPercentage ? (
          <p className=" flex flex-col justify-center items-center font-jost font-[600] text-[20px] opacity-80 text-[#000000] tracking-wide leading-[31.79px]">
            {percentage}%
            <span className="font-jost font-[500] text-[18px] text-[#000000] opacity-80 tracking-wide leading-[26.01px]">
              Goals
            </span>
          </p>
        ) : (
          <p className="font-jost font-[500] text-[18px] text-[#000000] opacity-80 tracking-wide leading-[26.01px]">
            {percentage}
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function HomeDataChart({ data, percentage }) {
  const showPercentage = data && data.length > 0 && percentage !== "This Month";

  return (
    <div className="relative w-[150px] h-[150px] ">
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={55}
            cornerRadius={50}
            paddingAngle={-15}
            barSize={20}
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
        {showPercentage ? (
          <p className="flex flex-col justify-center items-center font-jost font-[500] text-[16px] text-[#000000] text-center opacity-80">
            {percentage}%
          </p>
        ) : (
          <p className="font-jost font-[500] text-[14px] text-[#000000]">
            {percentage}
          </p>
        )}
      </div>
    </div>
  );
}

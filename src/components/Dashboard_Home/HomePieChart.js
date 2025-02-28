"use client";

import { RadialBarChart, RadialBar } from "recharts";

const data = [{ name: "Empty", value: 0, fill: "#E3E0F8" }];

const RadialChart = () => {
  return (
    <RadialBarChart
      width={250}
      height={250}
      cx="50%"
      cy="50%"
      innerRadius="70%"
      outerRadius="100%"
      barSize={22}
      data={data}
    >
      <RadialBar
        minAngle={15}
        background={{ fill: "#E3E0F8" }}
        clockWise
        dataKey="value"
      />
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Jost"
        fontSize="20px"
        fontWeight="500"
      >
        0%
      </text>
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Jost"
        fontSize="18px"
        fontWeight="500"
        fill="#000000"
      >
        Empty
      </text>
    </RadialBarChart>
  );
};

export default RadialChart;

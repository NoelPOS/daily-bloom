"use client";

import DonutChart from "@/components/Dashboard_Home/HomeDataChart";

export default function Data({
  totalHabits,
  upcomingHabits,
  failedHabits,
  completedHabits,
  ongoingHabits,
}) {
  console.log(
    totalHabits,
    upcomingHabits,
    failedHabits,
    completedHabits,
    ongoingHabits
  );
  const firstData = [
    { name: "completed", value: completedHabits, fill: "#F1E6B9" },
    { name: "active", value: ongoingHabits, fill: "#D5A8FF" },
  ];
  const secondData = [
    { name: "consistency", value: completedHabits, fill: "#55EFC4" },
    { name: "skipped", value: failedHabits, fill: "#DDA853" },
  ];
  const thirdData = [
    { name: "on time", value: completedHabits, fill: "#74B9FF" },
    { name: "missed", value: failedHabits, fill: "#E07A5F" },
  ];

  const firstDataPercentage = (
    (completedHabits / (completedHabits + ongoingHabits)) *
    100
  ).toFixed(0);
  const secondDataPercentage = (
    (completedHabits / (completedHabits + failedHabits)) *
    100
  ).toFixed(0);
  const thirdDataPercentage = (
    (completedHabits / (completedHabits + failedHabits)) *
    100
  ).toFixed(0);

  return (
    <div className=" grid grid-cols-3 gap-5 ">
      {/* Card Component */}
      {[
        { title: "Progress", data: firstData, percentage: firstDataPercentage },
        {
          title: "Consistency",
          data: secondData,
          percentage: secondDataPercentage,
        },
        {
          title: "Habit Completion",
          data: thirdData,
          percentage: thirdDataPercentage,
        },
      ].map((item, index) => (
        <div
          key={index}
          className="px-2 py-4 flex flex-col justify-center items-center gap-5 bg-backgroundPrimary rounded-[10px] shadow-inner"
        >
          {/* Title */}
          <h3 className="text-black text-[24px] font-[500] font-jost opacity-80 tracking-wide">
            {item.title}
          </h3>

          <div className="flex justify-between items-center gap-7">
            {/* Donut Chart */}
            <DonutChart data={item.data} percentage={item.percentage} />

            {/* Legend */}
            <div>
              {item.data.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center gap-3"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.fill }}
                  ></span>

                  <span className="text-black text-[14px] font-[500] font-jost opacity-80 tracking-wide capitalize">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

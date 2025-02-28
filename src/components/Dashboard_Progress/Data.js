"use client";

import Image from "next/image";

import DonutChart from "@/components/Dashboard_Progress/DonutPieWithData";

export default function Data({ data }) {
  // Dynamic Goal Data
  const goalData = [
    {
      name: "Remaining",
      value: 100 - data.completedHabitsPercentage,
      fill: "#E2E8F0",
    },
    {
      name: "Completed",
      value: data.completedHabitsPercentage,
      fill: "#FAA1D2",
    },
  ];

  // Dynamic Monthly Data
  const monthlyData = data.mostCompletedCategories.map((category, index) => ({
    name: category._id,
    value: category.count,
    fill: ["#FAA1D2", "#90CDFC", "#93FC90"][index % 5],
  }));

  // Static Datas
  const images = [
    "/assets/Progress/Workout.svg",
    "/assets/Progress/Yoga.svg",
    "/assets/Progress/Drinking.svg",
    "/assets/Progress/Reading.svg",
  ];

  const progressData = "100%";
  const progressTitleOneData = "Completed";
  const progressTitleTwoData = "Active";

  // Completed Data List
  const completedData = data.recentlyCompletedHabits.map((habit, index) => ({
    id: habit.id,
    name: habit.name,
    progress: progressData,
    progressTitleOne: progressTitleOneData,
    progressTitleTwo: progressTitleTwoData,
    image: images[index % images.length],
  }));

  const percentage = data.completedHabitsPercentage;

  return (
    <div className=" flex flex-col justify-start gap-[50px] ">
      {/* Progress Section */}
      <div className=" flex flex-col gap-[30px] ">
        <h1 className="font-montserrat font-[600] text-[24px] opacity-80 text-[#000000] leading-[32.91px]">
          The progress you&apos;ve already made.
        </h1>

        <div className="w-auto h-auto flex justify-start items-center gap-[40px] ">
          <div className="flex justify-start items-center gap-[80px] ">
            {/* First Donut Chart */}
            <DonutChart data={goalData} percentage={percentage} />

            {/* Second Donut Chart */}
            <DonutChart data={monthlyData} percentage={"This Month"} />
          </div>

          {/* Legend on the Right */}
          <div className="flex flex-col justify-center items-start gap-[10px] ">
            {monthlyData.map((entry, index) => (
              <div
                key={index}
                className="flex justify-center items-center gap-[8px]"
              >
                <div
                  className="w-[20px] h-[20px] rounded-full"
                  style={{ backgroundColor: entry.fill }} // Use the color defined in the data
                ></div>
                <span className="font-jost font-[400] text-[16px] text-[#000000] tracking-wide leading-[17.34px] opacity-80">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Completed Habits Section */}
      <div className="flex flex-col gap-[30px]">
        <h1 className="font-montserrat font-[600] text-[24px] opacity-80 text-[#000000] leading-[32.91px]">
          Completed Habits
        </h1>

        {/* Display Data Section */}
        <div className="w-[90%] h-auto flex flex-1 flex-wrap gap-5">
          {completedData.map((data, index) => {
            return (
              <div
                key={index}
                className={` w-[48%] h-full flex justify-between items-center bg-mainLight hover:bg-mainPrimary transition-all duration-700 cursor-pointer p-7
                  ${
                    index === 1 || index === 3 || index % 2 === 1
                      ? "flex-row-reverse items-end"
                      : "flex-row items-start"
                  }
                  ${
                    index === 0
                      ? "rounded-t-[10px] rounded-bl-[10px] rounded-br-[100px]"
                      : ""
                  }
                  ${
                    index === 1
                      ? "rounded-t-[10px] rounded-bl-[100px] rounded-br-[10px]"
                      : ""
                  }
                  ${
                    index === 2
                      ? "rounded-tl-[10px] rounded-tr-[100px] rounded-b-[10px]"
                      : ""
                  }
                  ${
                    index === 3
                      ? "rounded-tl-[100px] rounded-tr-[10px] rounded-b-[10px]"
                      : ""
                  }
                `}
              >
                <div
                  className={`h-full flex flex-col justify-between
                  ${index % 2 === 1 ? "items-end" : "items-start"}
                `}
                >
                  {/* Title */}
                  <h1
                    className={`font-montserrat font-[500] text-[26px] tracking-wide text-[#F5F5F5] ${
                      index === 1 || index === 3 || index % 2 === 1
                        ? "text-end"
                        : "text-start"
                    }`}
                  >
                    {data.name}
                  </h1>

                  {/* Bottom Data */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-montserrat font-[500] text-[22px] tracking-wide text-[#F5F5F5] text-start">
                      {data.progress}
                    </h3>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-start items-center gap-2">
                        <span className="inline-block w-[15px] h-[15px] border-2 border-mainPrimary rounded-full bg-[#F5F5F5]"></span>
                        <h3 className="font-jost font-[400] text-[16px] tracking-wide text-[#F5F5F5]">
                          {data.progressTitleOne}
                        </h3>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <span className="inline-block w-[15px] h-[15px] border-2 border-mainPrimary rounded-full bg-[#F5F5F5]"></span>
                        <h3 className="font-jost font-[400] text-[16px] tracking-wide text-[#F5F5F5]">
                          {data.progressTitleTwo}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <Image
                    src={data.image}
                    alt={data.name}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

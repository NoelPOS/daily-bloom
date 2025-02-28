"use client";

import Image from "next/image";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const searchParams = useSearchParams();
  const time = searchParams.get("duration");
  const Title = searchParams.get("text");

  const getInitialTimeInSeconds = (timeString) => {
    const minutes = parseInt(timeString.replace(/\D/g, ""), 10);
    return !isNaN(minutes) ? minutes * 60 : 0;
  };

  useEffect(() => {
    if (time) {
      setTimeLeft(getInitialTimeInSeconds(time));
    }
  }, [time]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft <= 0 && isRunning) {
      alert("Time's up!");
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  return (
    <div className=" space-y-20">
      <div className="flex justify-start items-center gap-5">
        <Link href={"/dashboard/challenge"}>
          <Image
            src={"/assets/challenge_images/arrow.svg"}
            alt="Arrow"
            width={25}
            height={20}
          />
        </Link>
        <h1 className="font-montserrat font-[500] text-[24px] text-[#000000] opacity-80 tracking-wide capitalize">
          {Title}
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center space-y-10">
        <h1 className="font-montserrat font-[500] text-[28px] text-mainPrimary text-center">
          Timer
        </h1>
        <div className=" w-60 h-60 flex items-center justify-center border-4 border-[#C6C6C6] rounded-full mb-7">
          <span className="font-montserrat font-[500] text-[40px] text-[#000000] opacity-80 tracking-wider">
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className=" flex justify-center items-center gap-5">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-10 py-2 bg-mainPrimary text-backgroundPrimary font-montserrat font-[500] text-[18px] rounded-[10px] shadow-inner hover:bg-opacity-80 transition-all duration-700 tracking-wider"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              if (time) {
                setTimeLeft(getInitialTimeInSeconds(time));
              }
            }}
            className="px-10 py-2 bg-gray-500 text-backgroundPrimary font-montserrat font-[500] text-[18px] rounded-[10px] shadow-inner hover:bg-opacity-80 transition-all duration-70 tracking-wider "
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div>
      {/* Hero Section */}
      <div className="flex justify-between items-center gap-[70px] mt-20 px-10 py-20 h-[449px] mb-16">
        {/* image section*/}
        <div>
          <Image
            src="/assets/about/about-hero-img.png"
            alt="hero-image"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>

        {/* text section*/}
        <div className="flex flex-col gap-[18px]">
          <h1 className="flex flex-col gap-[16px] font-montserrat text-mainPrimary uppercase xl:text-[50px] lg:text-[40px] text-[30px] font-[700] text-right w-[591px] h-[63px] leading-[63.39px] tracking-wide">
            About Us
          </h1>
          <h3 className="font-jost text-mainPrimary font-[400] xl:text-[25px] lg:text-[23px] text-[20px] text-right w-[591px] h-[63px] leading-[37.57px] tracking-wide">
            Habit Tracker is a web app developed by group 1 to help everyone to
            be more productive.
          </h3>
          <div className="w-[591px] flex justify-end items-center gap-[22px] mt-5">
            <Link href={"#Goals"}>
              <button className="py-2 px-7 border-[2px] rounded-[10px] bg-mainPrimary text-[#F5F5F5] font-montserrat font-[500] text-[20px] leading-[28.04px] hover:text-mainPrimary hover:bg-backgroundPrimary hover:border-mainPrimary transition-all duration-700 tracking-wide">
                Goals
              </button>
            </Link>
            <Link href={"#MissionVision"}>
              <button className="py-2 px-7 border-[2px] border-mainPrimary rounded-[10px] text-mainPrimary font-montserrat font-[500] text-[20px] leading-[28.04px] hover:text-backgroundPrimary hover:bg-mainPrimary transition-all duration-700 tracking-wide">
                Mission & Vision
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

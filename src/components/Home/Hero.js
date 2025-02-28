import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full h-[593px] flex justify-between px-10">
      <div className="w-1/2 flex flex-col justify-center items-start gap-7">
        {/* Text */}
        <h1 className="xl:text-[50px] lg:text-[40px] text-[30px] font-[700] font-montserrat text-mainSecondary uppercase leading-[67px] tracking-wide">
          your Journey <br />
          to Productivity
          <br /> starts here
        </h1>
        <article className="xl:text-[25px] lg:text-[23px] text-[20px] text-[#000000] font-[400] font-jost capitalize leading-10 tracking-wide">
          Track daily habits, visualize progress, and <br /> build a better you
        </article>

        {/* Button */}
        <Link href={"/signup"}>
          <button className="py-2 px-7 text-[20px] font-montserrat font-[500] text-backgroundPrimary capitalize leading-[34.13px] border outline-none bg-mainPrimary hover:text-mainPrimary hover:bg-backgroundPrimary hover:border-mainPrimary transition-all duration-700 rounded-[10px] tracking-wide">
            Start tracking today
          </button>
        </Link>
      </div>

      {/* Image */}
      <div className="w-1/2 flex justify-center items-center">
        <Image
          src={"/assets/home/hero_image.png"}
          alt="hero_image"
          width={650}
          height={500}
          className="w-auto h-auto object-contain"
        />
      </div>
    </div>
  );
}

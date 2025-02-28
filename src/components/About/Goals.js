import Image from "next/image";

export default function Goals() {
  return (
    <section id="Goals">
      {/* Goals Section */}
      <div className="w-full h-[743px] ">
        <div className="flex flex-col justify-center items-center gap-[20px] py-20">
          <Image
            src="/assets/about/goals-image.png"
            alt="goals_image"
            width={365}
            height={231}
            className="object-cover"
          />
          <h1 className="w-[591px] h-[63px] font-montserrat font-[600] text-[52px] text-[#F5F5F5] leading-[63.39px] text-center tracking-wide">
            Goals
          </h1>
          <h3 className="w-[591px] h-[114px] font-jost font-[400] text-[24px] leading-[37.57px] text-[#F5F5F5] text-center tracking-wide">
            Our goal is to empower individuals to build sustainable habits and
            celebrate consistent growth through simple, actionable tools
          </h3>
        </div>
      </div>
    </section>
  );
}

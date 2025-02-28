import Image from "next/image";

export default function MissionVision() {
  return (
    <section id="MissionVision">
      {/* Mission & Vision Section*/}
      <div className="w-full h-[893px] rounded rounded-t-[150px] bg-backgroundPrimary mt-[-50px] pt-20 gap-[20px] flex flex-col">
        {/* Mission */}
        <div className="flex justify-between items-center gap-[70px] px-10 ">
          {/* image */}
          <Image
            src="/assets/about/mission_image.png"
            alt="Mission_image"
            width={520}
            height={380}
            className="object-cover "
          />
          {/* text */}
          <div className="w-[650px] h-[269px] flex flex-col gap-[24px]">
            <h1 className="h-[63px] font-montserrat font-[600] text-[52px] text-mainPrimary leading-[63.39px] text-center tracking-wide">
              Our mission
            </h1>
            <h3 className="h-[190px] font-jost font-[400] text-[24px] leading-[37.57px] text-center text-mainPrimary tracking-wide">
              Our mission is to inspire and empower individuals to embrace
              mindfulness and cultivate mental well-being. we provide tools to
              help people build positive habits and lead fulfilling lives free
              from the overwhelming grip of stress and anxiety.
            </h3>
          </div>
        </div>

        {/* Vision */}
        <div className="flex justify-between items-center gap-[70px] mx-20 px-5 ">
          {/* text */}
          <div className="w-[650px] h-[269px] flex flex-col gap-[24px]">
            <h1 className="h-[63px] font-montserrat font-[600] text-[52px] text-mainPrimary leading-[63.39px] text-center tracking-wide">
              Our vision
            </h1>
            <h3 className="h-[190px] tracking-wide font-jost font-[400] text-[24px] leading-[37.57px] text-center text-mainPrimary">
              our vision is to create a world where building habits is simple,
              mindful, and empowering helping individuals lead balanced,
              resilient lives and achieve their goals without stress or
              overwhelm
            </h3>
          </div>

          {/* image */}
          <Image
            src="/assets/about/vision_image.png"
            alt="Vision_image"
            width={520}
            height={380}
            className="object-cover "
          />
        </div>
      </div>
    </section>
  );
}

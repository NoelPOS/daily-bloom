import Image from "next/image";

const dataItems = [
  {
    id: "1",
    name: "You’ll get",
    hightLightName: " 20 pt",
    lastText: " for each single task.",
  },
  {
    id: "2",
    name: "Free",
    hightLightName: " 100 pt",
    lastText: " for daily login.",
  },
  {
    id: "3",
    name: "Plus",
    hightLightName: " 100 pt",
    lastText: " for consequence login.",
  },
  {
    id: "4",
    name: "Above",
    hightLightName: " 5000 pt",
    lastText: " will get gold badge.",
  },
  {
    id: "5",
    name: "Above",
    hightLightName: " 10000 pt",
    lastText: " will diamond badge.",
  },
];

export default function Popup({ open, onChange }) {
  if (!open) return null;

  return (
    <div className="w-[100vw] h-[100vh] absolute top-0 left-[-333px] z-[1000]">
      {/* Popup overlay */}
      <div
        className="w-full h-full bg-[#8F8F8F80] "
        onClick={() => onChange(!open)}
      />

      {/* Popup box */}
      <div className="w-[550px] h-[400px] bg-backgroundPrimary rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 pt-4">
        <div className="flex justify-end items-center">
          <Image
            src={"/assets/rewards/rewards-icon.svg"}
            alt="close icon"
            width={16}
            height={16}
            className="cursor-pointer"
            onClick={() => onChange(!open)}
          />
        </div>

        {/* For content */}
        <div className="flex flex-col justify-center items-center gap-5">
          <Image
            src={"/assets/rewards/reward-badge.svg"}
            alt="Image"
            width={140}
            height={140}
          />
          <div className="flex flex-col gap-3">
            {dataItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-start items-center gap-3"
                >
                  <Image
                    src={"/assets/rewards/rewards-mark.svg"}
                    alt="Image"
                    width={30}
                    height={30}
                  />
                  <h2 className="font-montserrat font-[600] text-[20px] text-[#000000] tracking-wide opacity-80">
                    {item.name}
                    <span className="text-mainPrimary">
                      {item.hightLightName}
                    </span>
                    <span>{item.lastText}</span>
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

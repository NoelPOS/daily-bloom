const footerItems = [
  { id: 1, title: "Users", count: "10,000 +" },
  { id: 2, title: "Positive Feedback", count: "3000 +" },
  { id: 3, title: "Countries", count: "20 +" },
  { id: 4, title: "Engaged Users", count: "1000 +" },
];

export default function HeroFooter() {
  return (
    <div className="w-full h-[114px] bg-mainSecondary">
      <ul className="w-full h-full flex justify-evenly items-center">
        {footerItems.map((item, index) => (
          <li key={index} className="flex flex-col justify-center items-center">
            <span className="text-[22px] font-[700] font-montserrat text-backgroundPrimary tracking-wide">
              {item.count}
            </span>
            <span className="text-[22px] font-[600] font-montserrat text-backgroundPrimary tracking-wide">
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

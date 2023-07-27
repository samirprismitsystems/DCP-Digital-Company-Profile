import { useState } from "react";

export default function DashboardCards({ item }: any) {
  const [isHover, setIsHover] = useState<boolean>(false);

  const toggle = () => {
    setIsHover(!isHover);
  };

  return (
    <>
      <div
        className={`counter text-center h-[190px] w-[190px] pt-8 pl-6 pr-6 pb-6 my-0 mx-auto rounded-3xl relative border-[3px] ${item.borderClass} bg-transparent after:bg-transparent after:w-[100px] after:h-[100px] after:border-solid after:border-[15px] ${item.afterBorderClass} after:border-t-0 after:border-r-0 after:rounded-t-none after:rounded-br-none after:rounded-bl-[20px] after:shadow-none after:top-auto after:-left-[10px] after:-bottom-[10px] hover:cursor-pointer after:right-auto after:z-[9]`}
        onMouseEnter={toggle}
        onMouseLeave={toggle}
      >
        <div className="bg-info-light rounded-3xl absolute  top-4 left-4 right-4 bottom-4 cardShadow flex flex-col items-center justify-center m-2">
          <div
            className={`counter_icon text-4xl ${item.textColor} mt-1 mb-2`}
            style={{
              transform: isHover ? "rotateY(-360deg)" : "none",
              transition: "all .7s",
            }}
          >
            {item.icon}
          </div>
          <span
            className="dashboardCardFont font-semibold w-full text-black text-[30px] mb-1 block "
          >
            {item.digit}
          </span>
          <h3 className="text-[18px] text-center px-2 font-bold uppercase m-0">
            {item.name}
          </h3>
        </div>
      </div>
    </>
  );
}

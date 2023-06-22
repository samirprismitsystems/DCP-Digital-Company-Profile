import MainScrollAnimation from "@/common/MainScrollAnimation";
import React from "react";

interface IStepsProps {
  index: number;
  title: string;
  desc: string;
}

export default function Steps(props: IStepsProps) {
  return (
    <>
      <div className="p-4 lg:w-1/3 -z-20">
        <MainScrollAnimation>
          <div
            style={{
              backgroundImage:
                "linear-gradient(-174deg, rgba(18, 110, 131) 0, rgba(18, 110, 131,0) 100%)",
            }}
            className="h-full px-4 py-4 rounded-xl overflow-hidden text-center relative"
          >
            <div className="flex items-center">
              <div
                style={{
                  backgroundColor: "rgba(80, 196, 211, 0.102)",
                  border: "#50C4D31A solid 1px",
                }}
                className="h-full font-600 py-4 sm:py-0 px-14 sm:px-8  rounded-xl overflow-hidden text-center text-white relative text-[4rem] sm:h-[73px] sm:w-[66px] sm:flex sm:items-center  sm:text-center"
              >
                {props.index}
              </div>
              <h1 className="text-white px-4 font-bold text-[2.2rem] text-left">
                {props.title}
              </h1>
            </div>
            <p className="text-left pt-6 text-white text-[1.8rem]">
              {props.desc}
            </p>
          </div>
        </MainScrollAnimation>
      </div>
    </>
  );
}

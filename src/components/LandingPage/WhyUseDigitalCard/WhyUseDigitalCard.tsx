import MainScrollAnimation from "@/common/MainScrollAnimation";
import Accordion from "./Accordion";
import Image from "next/image";

export default function WhyUseDigitalCard() {
  return (
    <MainScrollAnimation>
      <div className="px-5">
        <div className="container mx-auto flex px-5 py-16 xs:pb-40 md:flex-row flex-col items-center md:item-start md:space-x-6">
          <div className="md:w-[50%] flex flex-col sm:items-start md:text-left items-center text-left">
            <Accordion />
          </div>
          <div className="xs:hidden md:block md:w-[50%]">
            <Image
              width={800}
              height={800}
              className="max-w-full lg:w-[413px] h-auto block m-auto"
              alt="hero"
              src="/assets/landing/mobile_overlay_sm.webp"
            />
          </div>
        </div>
      </div>
    </MainScrollAnimation>
  );
}

import MainScrollAnimation from "@/common/MainScrollAnimation";
import Accordion from "./Accordion";

export default function FAQ() {
  return (
    <MainScrollAnimation>
      <div className="px-5">
        <div className="container mx-auto flex px-5 py-16 md:flex-row flex-col items-center md:item-start md:space-x-6">
          <div className="md:w-[50%] flex flex-col sm:items-start md:text-left items-center text-left">
            <Accordion />
          </div>
          <div className="xs:hidden md:block md:w-[50%]">
            <img
              className="max-w-full h-auto block m-auto"
              alt="hero"
              src="/assets/landing/mobile_overlay_sm.webp"
            />
          </div>
        </div>
      </div>
    </MainScrollAnimation>
  );
}

import MainScrollAnimation from "@/common/MainScrollAnimation";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import Accordion from "./Accordion";

export default function WhyUseDigitalCard({
  cardImage,
}: {
  cardImage: string;
}) {
  return (
    <MainScrollAnimation>
      <div className="px-5">
        <div className="container mx-auto flex px-5 py-16 xs:pb-40 md:flex-row flex-col items-start md:item-start md:space-x-6">
          <div className="md:w-[50%] flex flex-col sm:items-start md:text-left items-center text-left">
            <Accordion />
          </div>
          <div className="xs:hidden md:block md:w-[50%]">
            <img
              className="max-w-full lg:w-[413px] h-auto block m-auto"
              alt="hero"
              src={`${UPLOAD_IMAGE_URI}/landingpageoriginal/${cardImage}`}
            />
          </div>
        </div>
      </div>
    </MainScrollAnimation>
  );
}

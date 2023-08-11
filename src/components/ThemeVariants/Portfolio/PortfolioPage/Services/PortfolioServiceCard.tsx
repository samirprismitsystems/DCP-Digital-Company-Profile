import { UPLOAD_IMAGE_URI } from "@/services/config";
import Image from "next/image";

export default function PortfolioServiceCard({
  path,
  index,
  id,
  name,
  description,
}: {
  path: string;
  index: number;
  id: string;
  name: string;
  description: string;
}) {
  return (
    <div key={index} className="item xs:w-full xlOne:w-[283.846px] px-4 h-full">
      <div className="services-box relative pt-0 mb-4 overflow-hidden  rounded-3xl">
        <div className="services-img flex justify-center items-center bg-portfolioTheme-primary h-96 ">
          <Image
            width={298}
            height={199}
            alt="services-img"
            title="services-img"
            src={`${UPLOAD_IMAGE_URI}/${id}/service/${path}`}
            className="w-full max-w-full h-auto align-middle"
            style={{
              filter: "blur(2px)",
              opacity: 0.5,
            }}
          />
        </div>
        <div className="services-info absolute top-0 p-4 flex flex-col justify-center items-center w-full h-full text-white">
          <h4 className="services-title text-white text-[2.2rem] font-normal">
            {name || "N/A"}
          </h4>
          <p className="services-description mb-0 text-2xl">
            {description || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

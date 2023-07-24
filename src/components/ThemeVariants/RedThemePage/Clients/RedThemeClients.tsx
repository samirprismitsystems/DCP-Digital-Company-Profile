import { IClients } from "@/types/commonTypes";
import Slider from "react-slick";
import RedThemeHeading from "../common/RedThemeHeading";
import ClientCard from "./ClientCard";

export default function RedThemeClients({
  lstClient,
}: {
  lstClient: IClients[];
}) {
  const configuration = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2.3,
    slidesToScroll: 1,
  };

  if (!lstClient) return null;

  return (
    <div>
      <RedThemeHeading title={"Clients"} />
      <Slider {...configuration}>
        {lstClient.map((item, index) => (
          <div key={index}>
            <ClientCard
              name={item.client_name}
              path={item.client_logo}
              id={item.company_id}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

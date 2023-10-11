import { ITestimonial } from "@/types/commonTypes";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistance } from "date-fns";

export default function GetPortfolioFeedBackReview({
  lstTestimonial,
}: {
  lstTestimonial: ITestimonial[];
}) {
  return lstTestimonial.map((item: ITestimonial, index: number) => (
    <div className="pt-4 w-full flex flex-col items-start c-text" key={index}>
      <h5 className="text-portfolioTheme-primary c-text text-4xl">
        {item.client_name || "N/A"}
      </h5>
      <div className="flex flex-wrap justify-center items-center">
        {item.ratting && parseInt(item.ratting) > 1 ? (
          Array.from({ length: parseInt(item.ratting) }).map((_, item: any) => {
            return (
              <div
                key={item}
                className="stars flex flex-wrap justify-center items-center"
              >
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-[#ff9e00] w-8 h-8 mt-2"
                />
              </div>
            );
          })
        ) : (
          <div className="stars flex flex-wrap justify-center items-center">
            <FontAwesomeIcon
              icon={faStar}
              className="text-[#ff9e00] w-8 h-8 mt-2"
            />
          </div>
        )}
        <div className="text-[1.6rem] pt-[6px] text-portfolioTheme-textColor pl-6">
          <span>
            {formatDistance(new Date(item.created_on), new Date(), {
              addSuffix: true,
            })}
            {/* {differenceInYears(new Date(), new Date())} */}
          </span>
          {/* <span className="p-2">years ago</span> */}
        </div>
      </div>
      <h2
        style={{
          lineHeight: 1.5,
        }}
        className="text-3xl title-font font-medium text-gray-900 mt-4 mb-2"
      >
        {item.comment || "N/A"}
      </h2>
      <div
        className={`flex items-center flex-wrap pb-4 mb-4 ${
          index !== lstTestimonial.length - 1 && "border-b-[1px]"
        } border-gray-300 mt-auto w-full`}
      >
        <div className="text-red-500 inline-flex items-center"></div>
      </div>
    </div>
  ));
}

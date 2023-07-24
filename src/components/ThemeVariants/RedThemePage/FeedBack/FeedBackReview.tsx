import { ITestimonial } from "@/types/commonTypes";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { differenceInYears } from "date-fns";

export default function FeedBackReview({
  lstTestimonial,
}: {
  lstTestimonial: ITestimonial[];
}) {
  return lstTestimonial.map((item: ITestimonial, index: number) => (
    <div className="p-4 py-2 w-full flex flex-col items-start">
      <h5 className="text-theme01">{item.client_name}</h5>
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
        <div className="text-[1.6rem] pt-[6px] text-redThemeGreyTextColor pl-6">
          <span>
            {differenceInYears(new Date(), new Date(item.created_on))}
          </span>
          <span className="p-2">years ago</span>
        </div>
      </div>
      <h2 className="text-2xl title-font font-medium text-gray-900 mt-4 mb-2">
        {item.comment}
      </h2>
      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-300 mt-auto w-full">
        <div className="text-red-500 inline-flex items-center"></div>
      </div>
    </div>
  ));
}

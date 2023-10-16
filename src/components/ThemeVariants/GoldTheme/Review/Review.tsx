import { ThemeContextApi } from "@/pages/[slug]";
import { ITestimonial } from "@/types/commonTypes";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistance } from "date-fns";
import dynamic from "next/dynamic";
import { useContext } from "react";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});


export default function Review() {
    const lstTestimonial = useContext(ThemeContextApi).testimonial;

    const options = {
        loop: true,
        items: 1,
        autoplay: true,
        dots: true,
        nav: false,
        autoplayTimeout: 3000,
        smartSpeed: 1100,
    };
    return (
        <section className='gold_testimonial xs:h-auto'>
            <div className="container h-full">
                <div className="h-full py-32 text-left flex justify-center items-center flex-col">
                    <h2 className="relative text-center uppercase text-white after:border-b-[2px] after:border-b-white after:border-solid after:block after:w-[120px] after:mt-2 after:mb-8 after:mx-auto">What Our <span className="text-gold-secondary">Clients</span> Said</h2> 

                    {lstTestimonial.length > 0 && (
                        <OwlCarousel className="owl-carousel owl-theme" {...options}>
                            {lstTestimonial.map((item: ITestimonial, index: number) => (
                                <div className="py-4 px-4 w-full flex flex-col items-start" key={index}>
                                    <h5 className="text-white font-semibold text-[1.8rem]">
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
                                                            className="text-gold-secondary w-8 h-8 mt-2"
                                                        />
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="stars flex flex-wrap justify-center items-center">
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                        className="text-gold-secondary w-8 h-8 mt-2"
                                                />
                                            </div>
                                        )}
                                        <div className="text-[1.6rem] pt-[6px] text-white pl-6">
                                            <span>
                                                {formatDistance(new Date(item.created_on), new Date(), {
                                                    addSuffix: true,
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-[1.8rem] py-4 text-white">
                                        {item.comment || "N/A"}
                                    </span>
                                </div>
                            ))}
                        </OwlCarousel>
                    )}
                </div>
            </div>
        </section>
    )
}

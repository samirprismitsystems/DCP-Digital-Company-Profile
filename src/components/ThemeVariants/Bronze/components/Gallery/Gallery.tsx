import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { UPLOAD_IMAGE_URI } from '@/services/config';
import { useContext } from 'react';

export default function Gallery() {
    const lstGallery = useContext(ThemeContextApi).portfolio;

    return (
        <>
            <div className="container py-[64px] px-[16px] md:py-[80px]" id="portfolio">
                <h2
                    className="text-center font-header text-4xl font-semibold uppercase text-bronze-primary sm:text-5xl lg:text-6xl"
                >
                    Check out our Portfolio
                </h2>
                <h3
                    className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
                >
                    Here's what We have done with the past
                </h3>

                <div
                    className="mx-auto grid w-full grid-cols-1 gap-8 pt-12 sm:w-3/4 md:gap-10 lg:w-full lg:grid-cols-2"
                >
                    {lstGallery && lstGallery.map((item, index: number) => (
                        <div
                            key={index}
                            className="mx-auto w-full relative h-[300px] transform transition-all hover:scale-105 md:mx-0"
                        >
                            <img
                                src={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/portfolio/${item.portfolio_image}`}
                                className="w-full shadow object-cover object-center align-middle h-full"
                                alt="portfolio image"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

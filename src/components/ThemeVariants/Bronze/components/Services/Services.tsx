import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { UPLOAD_IMAGE_URI } from '@/services/config';
import { useContext } from 'react';

export default function Services() {
    const lstServices = useContext(ThemeContextApi).service;

    return (
        <>
            <div className="container py-[64px] px-[16px] md:py-[80px]" id="services">
                <h2
                    className="font-header text-4xl text-center font-header font-semibold uppercase text-bronze-primary sm:text-5xl lg:text-6xl"
                >
                    Services
                </h2>
                <h3
                    className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
                >
                    Our services
                </h3>
                <div
                    className="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 xl:grid-cols-3"
                >
                    {lstServices && lstServices.map((item, index: number) => (
                        <div key={index} className="group rounded px-[32px] py-[48px] shadow hover:bg-bronze-primary hover:cursor-pointer">
                            <div className="mx-auto h-24 w-24 relative text-center xl:h-28 xl:w-28">
                                <div className="transition-all duration-700 ease group-hover:transform group-hover:scale-150 h-full">
                                    <img
                                        src={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/service/${item.service_image}`}
                                        alt="development icon"
                                        className='rounded-full object-cover object-center align-middle h-full'
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <h3
                                    className="pt-8 text-[2.2rem] lg:text-[2rem] py-4 font-semibold uppercase text-bronze-primary group-hover:text-yellow-200"
                                >
                                    {Utils.getContent(item.service_name)}
                                </h3>
                                <p className="text-grey text-[2rem] lg:text-[1.8rem] group-hover:text-white">
                                    {Utils.getContent(item.service_desc)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

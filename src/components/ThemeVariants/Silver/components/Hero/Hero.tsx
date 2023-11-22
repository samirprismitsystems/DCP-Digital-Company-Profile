import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useContext } from "react";

export default function Hero() {
    const objCompany = useContext(ThemeContextApi).company;

    return (
        <>
            <div id="home-section" className='bg-silver-lightkblue'>
                <div className="container min-w-7xl w-full py-72 md:py-[25rem] sm:pb-24 px-6">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className='flex flex-col justify-evenly'>
                            <h1 className='text-silver-midnightblue  font-semibold text-center lg:text-start lh-120 pt-5 lg:pt-0'>{Utils.getContent(objCompany.company_name)}</h1>
                            <h3 className='text-silver-charcoal text-3xl font-normal text-center lg:text-start opacity-75 pt-5 lg:pt-0 leading-normal'>{Utils.getContent(objCompany.company_desc)}</h3>
                            <div className='flex mt-8 items-center justify-center pt-10 lg:pt-4'>
                                <button className="bg-silver-Blueviolet text-white text-2xl rounded-md px-12 py-6" onClick={() => {
                                    Utils.scrollToView('products', -30)
                                }}>Learn more</button>
                            </div>
                        </div>

                        <div className='flex justify-center'>
                            <img src={`${UPLOAD_IMAGE_URI}/${objCompany.company_id || Utils.getCompanyID()}/banner/${objCompany.company_banner}`} alt="nothing" width={1000} height={805} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

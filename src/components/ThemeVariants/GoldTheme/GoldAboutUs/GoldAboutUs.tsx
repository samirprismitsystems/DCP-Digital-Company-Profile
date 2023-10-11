import { ThemeContextApi } from '@/pages/[slug]'
import Utils from '@/services/Utils';
import React, { useContext } from 'react'

export default function GoldAboutUs() {
    const objItem = useContext(ThemeContextApi)?.company;

    return (
        <section id='aboutUs' className='text-center py-24 bg-gold-primary flex justify-center items-center flex-col xs:px-[5%] md:px-[10%] xl:px-[25%]'>
            <h2 className='uppercase text-center text-white'>Get To <span className='text-yellow-200'>Know</span> Us</h2>
            <div className='mt-[50px] text-center text-white'>
                <span className='text-[1.8rem] leading-relaxed'>{Utils.getContent(objItem?.company_desc)}</span>
            </div>
        </section>
    )
}

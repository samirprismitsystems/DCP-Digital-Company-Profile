import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import Link from 'next/link';
import { useContext } from 'react';
import SocialMediaIcons from '../Hero/SocialMediaIcons';

export default function Footer(props: {
    bgColor?: string;
}) {
    const objCompany = useContext(ThemeContextApi).company;

    return (
        <>
            <div className={`${props.bgColor ? props.bgColor : "bg-bronze-primary"}`}>
                <div className="container flex flex-col items-center justify-between py-6 sm:flex-row">
                    <p className="text-center font-body text-[1.8rem] text-white md:text-left">
                        © Copyright 2023. All right reserved <Link href="https://www.prismitsystems.com" target='_blank' className='border-b border-b-yellow-200 text-yellow-200'>{Utils.getContent(objCompany.company_name)}</Link>.
                    </p>
                    <div className='text-base'>
                        <SocialMediaIcons />
                    </div>
                </div>
            </div>
        </>
    )
}

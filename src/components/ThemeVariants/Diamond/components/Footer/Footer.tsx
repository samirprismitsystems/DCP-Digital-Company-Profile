import SocialMediaIcons from "@/components/ThemeVariants/Bronze/components/Hero/SocialMediaIcons";
import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import Link from "next/link";
import { useContext } from "react";

const Footer = () => {
    const objCompany = useContext(ThemeContextApi).company;

    return (
        <>
            <footer
                id="contact"
                className="wow fadeInUp relative z-10 bg-[#E5EAFE] dark:bg-diamond-dark"
                data-wow-delay=".1s"
            >
                <div className="container flex flex-col items-center justify-between py-6 sm:flex-row">
                    <p className="text-center text-base text-black dark:text-white">
                        © Copyright 2023. All right reserved <Link href="https://www.prismitsystems.com" target='_blank' className='border-b border-b-blue-600 text-blue-600'>{Utils.getContent(objCompany.company_name)}</Link>.
                    </p>
                    <div className='text-base text-center'>
                        <SocialMediaIcons isFontSizeSmall={true} />
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;

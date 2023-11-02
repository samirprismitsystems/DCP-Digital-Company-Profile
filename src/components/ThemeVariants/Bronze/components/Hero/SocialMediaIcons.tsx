import { ThemeContextApi } from '@/pages/[slug]';
import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP, faTelegramPlane, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useContext } from 'react';

export default function SocialMediaIcons(props: { isFontSizeSmall?: boolean }) {
    const lstSocial = useContext(ThemeContextApi).social;
    const iconMapping: any = {
        faFacebookF: faFacebookF,
        faInstagram: faInstagram,
        faLinkedinIn: faLinkedinIn,
        faPinterestP: faPinterestP,
        faTelegramPlane: faTelegramPlane,
        faTwitter: faTwitter,
        faWhatsapp: faWhatsapp,
        faYoutube: faYoutube,
    };

    return (
        <>
            <div className="flex items-center justify-center pt-5 pl-2 sm:justify-start sm:pt-0">
                {lstSocial.map((item, index: number) => {
                    const iconComponent = iconMapping[item.socialmedia_logo];
                    return (
                        <Link href={item.link} target='_blank' key={index}>
                            <FontAwesomeIcon icon={iconComponent} className={`${props.isFontSizeSmall ? "text-base text-black dark:text-white p-2 hover:text-blue-600 dark:hover:text-yellow-200":"px-2 text-[2rem] text-white hover:text-yellow-200 ml-1"}`} />
                        </Link>
                    );
                })}
            </div>
        </>
    )
}

import { ThemeContextApi } from '@/pages/[slug]';
import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP, faTelegramPlane, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useContext } from 'react';

export default function FollowUs() {
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

    if (!lstSocial) return null;
    return (
        <>
            {lstSocial.map((item) => {
                const iconComponent = iconMapping[item.socialmedia_logo];
                return (
                    <Link
                        key={item.social_id}
                        href={"#"}
                        target="_blank"
                        className={`mx-2 my-4 w-16 h-16 text-center text-white flex justify-center items-center border-b-[2px] border-b-white border-dotted group bg-gold-primary hover:bg-[#ffe800] hover:border-b--primary`}
                    >
                        <FontAwesomeIcon
                            className="text-3xl font-bold group-hover:text-gold-primary "
                            icon={iconComponent}
                        />
                    </Link>
                );
            })}
        </>
    )
}

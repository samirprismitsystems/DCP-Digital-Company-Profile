import { ThemeContextApi } from '@/pages/[slug]';
import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP, faTelegramPlane, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useContext } from 'react';
import FollowUsCard from './Card/FollowUsCard';

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
            {lstSocial.map((item, index: number) => {
                const iconComponent = iconMapping[item.socialmedia_logo];
                const color = item.socialmedia_color
                return (
                    <FollowUsCard key={index} icon={iconComponent} socialColor={color} socialID={item.social_id} />
                );
            })}
        </>
    )
}

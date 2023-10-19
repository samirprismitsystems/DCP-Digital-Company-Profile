import style from "../styles/socialLinkPage.module.scss";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faPinterestP,
  faTelegramPlane,
  faTwitter,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function SocialLinkIcon({
  icons,
  socialID,
}: {
  icons: string;
  socialID: string;
}) {
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

  const iconComponent = iconMapping[icons];
  return (
    <>
      <FontAwesomeIcon
        className={`${style.socialLinkColors} ${style.socialLinkIconItems} ${style[`socialmedia_color_${socialID}`]}`}
        icon={iconComponent}
      />
    </>
  );
}

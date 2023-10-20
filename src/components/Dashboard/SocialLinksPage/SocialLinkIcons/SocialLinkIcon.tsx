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
import style from "../styles/socialLinkPage.module.scss";
export default function SocialLinkIcon({
  color,
  icons
}: {
  color: string;
  icons: any;
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
        className={`${style.socialLinkColors} ${style.socialLinkIconItems}`}
        icon={iconComponent}
        style={{
          color: color
        }}
      />
    </>
  );
}

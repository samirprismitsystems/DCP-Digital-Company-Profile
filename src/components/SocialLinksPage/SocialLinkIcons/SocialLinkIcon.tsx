import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  if (!iconComponent) return null;
  return (
    <>
      <FontAwesomeIcon
        className={`social-link-icons socialmedia_color_${socialID}`}
        icon={iconComponent}
      />
    </>
  );
}

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

  console.log("iconComponent-1", iconComponent);
  console.log("icons", icons);
  console.log("socialID", socialID);

  console.log(
    "-----",
    <FontAwesomeIcon
      className={`social-link-icons socialmedia_color_${socialID}`}
      icon={iconComponent}
    />
  );

  console.log("iconComponent-2", iconComponent);
  return (
    <>
      <FontAwesomeIcon
        className={`social-link-icons socialmedia_color_${socialID}`}
        icon={iconComponent}
      />
    </>
  );
}

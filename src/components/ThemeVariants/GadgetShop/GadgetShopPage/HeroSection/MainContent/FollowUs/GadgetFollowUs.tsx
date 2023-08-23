import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faPinterestP,
  faTelegram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { GadgetShopContextApi } from "../../../GadgetShopPage";

const iconMapping: any = {
  faFacebookF: faFacebookF,
  faInstagram: faInstagram,
  faLinkedinIn: faLinkedinIn,
  faPinterestP: faPinterestP,
  faTelegramPlane: faTelegram,
  faTwitter: faTwitter,
  faYoutube: faYoutube,
};

export default function GadgetFollowUs() {
  const lstSocial = useContext(GadgetShopContextApi).social;

  return (
    <>
      <div className="follow-us-block xs:mt-24 md:mt-16 gadgetfontfamily">
        <h3 className="text-center gadgetfontfamily text-gadgetTheme-title text-[2.4rem] font-semibold">
          Follow Us On
        </h3>
        <div className="social-links pt-4  flex flex-wrap xs:justify-center md:justify-center items-center c-text space-x-4">
          {lstSocial.map((item) => {
            const iconComponent = iconMapping[item.socialmedia_logo];
            if (iconComponent)
              return (
                <a
                  key={item.social_id}
                  href={item.link || "#"}
                  target="_blank"
                  className={`${item.socialmedia_color} rounded-2xl social-link fb-icon mx-2 my-4 xs:w-20 xs:h-20 md:w-16 md:h-16 text-center text-white bg-portfolioTheme-primary flex justify-center items-center`}
                >
                  <FontAwesomeIcon
                    className="xs:text-[2.6rem] md:text-4xl font-bold "
                    icon={iconComponent}
                  />
                </a>
              );
          })}
        </div>
      </div>
    </>
  );
}

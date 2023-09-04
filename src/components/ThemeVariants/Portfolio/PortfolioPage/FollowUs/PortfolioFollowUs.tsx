import { ThemeContextApi } from "@/pages/[slug]";
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
import { useContext } from "react";

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

export default function PortfolioFollowUs() {
  const lstSocial = useContext(ThemeContextApi).social;

  return (
    <>
      <div className="follow-us-block mt-30 mt-16 c-text text-portfolioTheme-textColor">
        <h3 className="text-center portfolio-h3 text-portfolioTheme-titleColor font-semibold">
          Follow Us On
        </h3>
        <div className="social-links pt-6 flex flex-wrap xs:justify-center md:justify-center items-center c-text">
          {lstSocial.map((item) => {
            const iconComponent = iconMapping[item.socialmedia_logo];
            return (
              <a
                key={item.social_id}
                href="#!"
                className={`${item.socialmedia_color} rounded-2xl social-link fb-icon mx-2 my-4 w-20 h-20 text-center text-white bg-portfolioTheme-primary flex justify-center items-center`}
              >
                <FontAwesomeIcon
                  className="text-5xl font-bold "
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

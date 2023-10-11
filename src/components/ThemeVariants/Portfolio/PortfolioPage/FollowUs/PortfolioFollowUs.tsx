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
import Link from "next/link";
import { useContext } from "react";
import QRCode from "react-qr-code";

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
      <div
        className="pt-16"
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 120,
          width: "100%",
        }}
      >
        <QRCode
          size={55}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={window.location.href}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div className="follow-us-block mt-30 mt-16 c-text text-portfolioTheme-textColor">
        <h3 className="text-center portfolio-h3 text-portfolioTheme-titleColor font-semibold">
          Follow Us On
        </h3>
        <div className="social-links pt-6 flex flex-wrap xs:justify-center md:justify-center items-center c-text">
          {lstSocial.map((item) => {
            const iconComponent = iconMapping[item.socialmedia_logo];
            return item.link ? (
              <Link
                key={item.social_id}
                href={item.link || "#"}
                target="_blank"
                className={`${item.socialmedia_color} rounded-2xl social-link fb-icon mx-2 my-4 w-20 h-20 text-center text-white bg-portfolioTheme-primary flex justify-center items-center`}
              >
                <FontAwesomeIcon
                  className="text-5xl font-bold "
                  icon={iconComponent}
                />
              </Link>
            ) : (
              <button
                type="button"
                key={item.social_id}
                className={`${item.socialmedia_color} rounded-2xl social-link fb-icon mx-2 my-4 w-20 h-20 text-center text-white bg-portfolioTheme-primary flex justify-center items-center`}
              >
                <FontAwesomeIcon
                  className="text-5xl font-bold "
                  icon={iconComponent}
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

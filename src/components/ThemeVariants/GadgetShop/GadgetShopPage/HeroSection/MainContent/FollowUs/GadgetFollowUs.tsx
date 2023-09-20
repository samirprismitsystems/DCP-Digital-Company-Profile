import { ThemeContextApi } from "@/pages/[slug]";
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
import QRCode from "react-qr-code";

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
  const lstSocial = useContext(ThemeContextApi).social;

  return (
    <>
      <div className="follow-us-block xs:mt-24 md:mt-16 gadgetfontfamily">
        <div
          className="pb-8 pt-4"
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
        <h3 className="text-center gadgetfontfamily text-gadgetTheme-title xs:text-[3rem] md:text-[2.7rem] font-semibold xl:text-[3.5rem] xlTwo:text-[2.7rem]">
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
                  className={`${item.socialmedia_color} rounded-2xl social-link fb-icon mx-2 my-4 xs:w-[5.5rem] xs:h-[5.5rem] xl:w-[7rem] xl:h-[7rem] xlTwo:w-[4.3rem] xlTwo:h-[4.3rem]  text-center text-white bg-portfolioTheme-primary flex justify-center items-center`}
                >
                  <FontAwesomeIcon
                    className="xs:text-[2.8rem] xl:text-[3.5rem] xlTwo:text-[2.5rem]  font-bold "
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

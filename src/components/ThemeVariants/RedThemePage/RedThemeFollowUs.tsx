import { ISocialLinks } from "@/types/sociallinks";
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

export default function RedThemeFollowUs({
  lstSocialData,
}: {
  lstSocialData: ISocialLinks[];
}) {
  if (!lstSocialData) return null;

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
  
  return (
    <>
      <h3 className="text-center themeh3">Follow Us On</h3>
      <div className="social_links flex flex-wrap justify-center items-center">
        {lstSocialData.map((item, index) => {
          const iconComponent = iconMapping[item.socialmedia_logo];
          return (
            <a
              key={item.social_id}
              href={item.link}
              className={`${item.socialmedia_color} mx-2 w-20 h-20  text-center rounded-2xl mt-6 bg-yellow-200 flex justify-center items-center text-white`}
            >
              <FontAwesomeIcon className="w-8 h-8" icon={iconComponent} />
            </a>
          );
        })}
      </div>
    </>
  );
}

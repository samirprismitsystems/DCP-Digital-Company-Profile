import {
  faFacebook,
  faFacebookF,
  faSquareWhatsapp,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomeCareSaveContact() {
  return (
    <>
      <div
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
        className="text-center contact-information mb-16 bg-white rounded-3xl p-5"
      >
        <div className="my-6  grid grid-cols-2 gap-8 mx-3 py-6">
          <div className="">
            <a
              href="nitin_patel.vcf"
              className="py-6 text-white text-center bg-homeCareTheme-primary flex items-center justify-center min-w-[140px] rounded-2xl max-h-[40px] text-3xl font-medium homecarefont"
              download
              style={{
                border: "1px solid rgba(5,59,123,1)",
              }}
            >
              SAVE CONTACT
            </a>
          </div>
          <div className="section py-6 text-white text-center bg-homeCareTheme-primary flex items-center justify-center min-w-[140px] rounded-2xl max-h-[40px] text-3xl font-medium homecarefont">
            <div className="flex w-full flex-wrap mt-4 mb-4 justify-start">
              <div className="dropdown w-full">
                <details className="dropdown-menu w-full">
                  <summary className="block btn-outline-primary btn-primary">
                    SHARE <FontAwesomeIcon icon={faCaretDown} />
                  </summary>
                  <div className="dropdown_list bg-white text-homeCareTheme-primary  h-full flex justify-start items-center flex-col relative top-[80px] w-full">
                    <a
                      className="w-full px-12 dropdown-item py-4 flex justify-between items-center "
                      href="whatsapp://send?text=The text to share!"
                      data-action="share/whatsapp/share"
                    >
                      <FontAwesomeIcon className="text-4xl" icon={faWhatsapp} />
                      <div className="text-4xl ml-4">Whatsapp</div>
                    </a>
                    <a
                      className="w-full px-12 dropdown-item py-4 flex justify-start items-center "
                      href="whatsapp://send?text=The text to share!"
                      data-action="share/whatsapp/share"
                    >
                      <FontAwesomeIcon
                        className="text-4xl mr-4"
                        icon={faFacebook}
                      />
                      <div className="text-4xl">Facebook</div>
                    </a>
                    <a
                      className="w-full px-12 dropdown-item py-4 flex justify-start items-center "
                      href="whatsapp://send?text=The text to share!"
                      data-action="share/whatsapp/share"
                    >
                      <FontAwesomeIcon
                        className="text-4xl mr-4"
                        icon={faTwitter}
                      />
                      <div className="text-4xl">Twitter</div>
                    </a>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

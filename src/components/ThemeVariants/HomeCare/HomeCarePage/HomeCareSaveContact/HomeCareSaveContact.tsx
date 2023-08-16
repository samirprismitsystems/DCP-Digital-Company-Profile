import {
  faFacebook,
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
        className="border border-solid border-homeCareTheme-opacityBorder text-center contact-information mb-10 bg-white rounded-3xl p-5"
      >
        <div className="grid grid-cols-2 gap-8 my-16 mx-8">
          <div className="py-6 text-white text-center bg-homeCareTheme-primary flex items-center justify-center min-w-[140px] rounded-2xl max-h-[40px] text-3xl font-medium homecarefont">
            <a
              href="nitin_patel.vcf"
              className="span btn btn-primary w-100"
              download
            >
              SAVE CONTACT
            </a>
          </div>
          <div>
            <div className="dropdown">
              <details className="dropdown_menu">
                <summary className="btn-outline-primary btn-primary py-6 border border-homeCareTheme-primary text-center bg-white text-homeCareTheme-primary flex items-center justify-center min-w-[140px] rounded-2xl max-h-[40px] text-3xl font-medium homecarefont">
                  <span className="mr-4">SHARE</span>{" "}
                  <FontAwesomeIcon icon={faCaretDown} />
                </summary>
                <div
                  className="dropdown_list bg-white flex justify-center items-center flex-col pt-4"
                  style={{ boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)" }}
                >
                  <a
                    className="flex justify-center items-center py-2 px-4 text-left homecarefont rounded-3xl focus:bg-homeCareTheme-primary "
                    href="whatsapp://send?text=The text to share!"
                    data-action="share/whatsapp/share"
                  >
                    <FontAwesomeIcon
                      className="focus:text-white text-4xl font-medium text-homeCareTheme-primary"
                      icon={faWhatsapp}
                    />
                    <span className="focus:text-white active:text-white text-homeCareTheme-primary text-3xl text-left font-medium">
                      Whatsapp
                    </span>
                  </a>

                  <a
                    className="w-full dropdown-item flex justify-start gap-4 py-4"
                    href="https://facebook.com/sharer/sharer.php?u=#"
                  >
                    <FontAwesomeIcon
                      className="text-3xl font-medium text-homeCareTheme-primary"
                      icon={faFacebook}
                    />
                    <span className="text-3xl font-medium text-homeCareTheme-primary text-left">
                      Facebook
                    </span>
                  </a>
                  <a
                    className="w-full dropdown-item flex justify-start gap-4 py-4"
                    href="https://twitter.com/share?url=#"
                  >
                    <FontAwesomeIcon
                      className="text-3xl font-medium text-homeCareTheme-primary"
                      icon={faTwitter}
                    />
                    <span className="text-3xl font-medium text-homeCareTheme-primary text-left">
                      Twitter
                    </span>
                  </a>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

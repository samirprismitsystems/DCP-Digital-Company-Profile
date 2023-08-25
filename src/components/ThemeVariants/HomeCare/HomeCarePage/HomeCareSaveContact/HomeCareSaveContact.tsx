import {
  faFacebook,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { HomeCareContextApi } from "../HomeCarePage";
import { ThemeContextApi } from "@/pages/[slug]";

export default function HomeCareSaveContact() {
  const objCompany = useContext(ThemeContextApi).company;

  return (
    <>
      <div
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
        className=" border border-solid border-homeCareTheme-opacityBorder text-center contact-information mb-10 bg-white rounded-3xl p-5"
      >
        <div className="lg:w-1/2 xl:w-1/3 md:m-auto md:p-12 grid grid-cols-2 gap-8 my-16 mx-8">
          <div className="py-6 text-white text-center bg-homeCareTheme-primary flex items-center justify-center min-w-[140px] rounded-2xl max-h-[40px] font-medium homecarefont">
            <a
              href="samirshaikh.vcf"
              className="xs:text-[1.875rem] span btn btn-primary w-100 xl:text-2xl"
              download
            >
              SAVE CONTACT
            </a>
          </div>
          <div>
            <div className="dropdown">
              <details className="dropdown_menu relative">
                <summary className="hover:cursor-pointer btn-outline-primary btn-primary py-6 border border-homeCareTheme-primary text-center bg-white text-homeCareTheme-primary flex items-center justify-center min-w-[140px] rounded-2xl max-h-[40px] font-medium homecarefont">
                  <span className="text-2xl mr-4 xs:text-[1.875rem] xl:text-2xl">
                    SHARE
                  </span>{" "}
                  <FontAwesomeIcon icon={faCaretDown} />
                </summary>
                <div
                  className="dropdown_list pt-5 min-w-full h-auto  absolute bg-white flex flex-wrap"
                  style={{ boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)" }}
                >
                  <a
                    className="group w-full dropdown-item flex justify-start gap-4 py-4 pl-6 hover:bg-homeCareTheme-primary  hover:rounded-[25px]"
                    href={`https://api.whatsapp.com/send?phone=${objCompany.company_contact}&text=hi`}
                    data-action="share/whatsapp/share"
                  >
                    <FontAwesomeIcon
                      className="group-hover:text-white text-4xl font-medium text-homeCareTheme-primary"
                      icon={faWhatsapp}
                    />
                    <span className="text-2xl text-homeCareTheme-primary text-left font-medium group-hover:text-white">
                      Whatsapp
                    </span>
                  </a>
                  <a
                    className="group hover:bg-homeCareTheme-primary  hover:rounded-[25px]  w-full dropdown-item flex justify-start gap-4 py-4 pl-6"
                    href="https://facebook.com/sharer/sharer.php?u=#"
                  >
                    <FontAwesomeIcon
                      className="group-hover:text-white text-3xl font-medium text-homeCareTheme-primary"
                      icon={faFacebook}
                    />
                    <span className="group-hover:text-white text-2xl font-medium text-homeCareTheme-primary text-left">
                      Facebook
                    </span>
                  </a>
                  <a
                    className="group hover:bg-homeCareTheme-primary  hover:rounded-[25px] w-full dropdown-item flex justify-start gap-4 py-4 pl-6"
                    href="https://twitter.com/share?url=#"
                  >
                    <FontAwesomeIcon
                      className="group-hover:text-white text-3xl font-medium text-homeCareTheme-primary"
                      icon={faTwitter}
                    />
                    <span className="group-hover:text-white text-2xl font-medium text-homeCareTheme-primary text-left">
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

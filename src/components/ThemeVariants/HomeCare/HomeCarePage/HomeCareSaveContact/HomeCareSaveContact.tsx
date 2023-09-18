import PageCircularLoading from "@/common/PageCircularLoading";
import SocialLinkIcon from "@/components/SocialLinksPage/SocialLinkIcons/SocialLinkIcon";
import { ThemeContextApi } from "@/pages/[slug]";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { ISocialLinks } from "@/types/sociallinks";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function HomeCareSaveContact() {
  const objCompany = useContext(ThemeContextApi).company;
  const [lstSocial, setLstSocial] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getSocialLinksData();
      if (!res.error) {
        setLstSocial(res.social);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  function downloadToFile(content: any, filename: string, contentType: string) {
    if (typeof window !== "undefined") {
      const a = document.createElement("a");
      const file = new Blob([content], { type: contentType });

      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();

      URL.revokeObjectURL(a.href);
    }
  }

  const onSaveCardClick = () => {
    const makeVCard = () => {
      const vCardVersion = "VERSION:4.0";
      const vCardName = `FN:${objCompany.company_name}`;
      const vCardTitle = `TITLE:${objCompany.business_segment}`;
      const vCardTel = `TEL;TYPE=WORK,VOICE:${objCompany.company_contact}`;
      const vCardTelCell = `TEL;TYPE=CELL,VOICE:${objCompany.company_alternate_contact}`;
      const vCardEmail = `EMAIL;TYPE=WORK:${objCompany.company_email}`;
      const vCardAddress = `ADR;TYPE=WORK:;;${objCompany.address};;;`;
      const vCardUrl = `URL:${window.location.href}`;
      const vCardImage = `PHOTO;VALUE=uri:${UPLOAD_IMAGE_URI}/${Utils.getCompanyID()}/${
        objCompany.company_logo
      }`;
      const vCardTimeStamp = `REV:${new Date().toISOString()}`;

      const vcard = `BEGIN:VCARD
${vCardVersion}
${vCardName}
${vCardTitle}
${vCardTel}
${vCardTelCell}
${vCardEmail}
${vCardAddress}
${vCardUrl}
${vCardImage}
${vCardTimeStamp}
END:VCARD`;

      downloadToFile(vcard, "vcard.vcf", "text/vcard");
    };

    makeVCard();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) return <PageCircularLoading />;
  return (
    <>
      <div
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
        className=" border border-solid border-homeCareTheme-opacityBorder text-center contact-information mb-10 bg-white rounded-3xl p-5"
      >
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
        <div className="lg:w-1/2 xl:w-1/3 md:m-auto md:p-12 grid xs:grid-cols-1 sm:grid-cols-2 gap-8 my-16 mx-8">
          <div className="py-6 text-white text-center bg-homeCareTheme-primary flex items-center justify-center min-w-[140px] rounded-2xl max-h-[40px] font-medium homecarefont">
            <button
              type="button"
              onClick={onSaveCardClick}
              className="xs:text-[1.875rem] span btn btn-primary w-100 xl:text-2xl"
            >
              SAVE CONTACT
            </button>
          </div>
          <div>
            <div className="dropdown">
              <details className="dropdown_menu relative">
                <summary className="hover:cursor-pointer btn-outline-primary btn-primary py-6 border border-homeCareTheme-primary text-center bg-white text-homeCareTheme-primary flex items-center justify-center min-w-[170px] rounded-2xl max-h-[40px] font-medium homecarefont">
                  <span className="text-2xl mr-4 xs:text-[1.875rem] xl:text-2xl">
                    SHARE
                  </span>{" "}
                  <FontAwesomeIcon icon={faCaretDown} />
                </summary>
                <div
                  className="dropdown_list px-6 pb-4 pt-5 min-w-full h-auto  absolute bg-white flex flex-wrap"
                  style={{ boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)" }}
                >
                  {lstSocial &&
                    lstSocial.map((item: ISocialLinks, index: number) => (
                      <Link
                        key={item.social_id || index}
                        className="group w-full dropdown-item flex justify-start gap-4 py-4 pl-6 hover:bg-homeCareTheme-primary  hover:rounded-[25px]"
                        href={`${item.link || "#"}`}
                        data-action="share/whatsapp/share"
                        target="_blank"
                      >
                        <SocialLinkIcon
                          icons={item.socialmedia_logo}
                          socialID={item.social_id}
                        />
                        <span className="text-2xl text-homeCareTheme-primary text-left font-medium group-hover:text-white">
                          {item.socialmedia_name}
                        </span>
                      </Link>
                    ))}
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

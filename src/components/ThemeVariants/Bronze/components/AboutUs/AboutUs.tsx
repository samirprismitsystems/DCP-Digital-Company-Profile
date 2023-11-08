import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { faFacebookF, faInstagram, faLinkedinIn, faSquareWhatsapp, faTelegram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faClock, faSave, faShareSquare, faSquareShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ShareCards from "./ShareCards/ShareCards";

export default function AboutUs() {
    const objCompany = useContext(ThemeContextApi).company;

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
            const vCardImage = `PHOTO;VALUE=uri:${UPLOAD_IMAGE_URI}/${objCompany.company_id || Utils.getCompanyID()}/${objCompany.company_logo
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

    return (
        <>
            <div className="container pt-[64px] px-[10px] md:pt-[80px]" >
                <h2
                    className="font-header text-[2.5rem] text-center font-header font-semibold uppercase text-bronze-primary sm:text-5xl lg:text-6xl"
                >
                    About Us
                </h2>
                <h3
                    id="about"
                    className="pt-6 text-center font-header text-[1.8rem] font-medium text-black sm:text-[2rem] lg:text-[2.3rem]"
                >
                    Who Are We?
                </h3>

                <div className="relative mx-auto mt-12 flex w-full flex-col lg:w-2/3">
                    <span
                        className="text-center text-[1.8rem]"
                    >{Utils.getContent(objCompany.company_desc)}</span>
                </div>
            </div>

            <div

                className="bg-cover bg-top bg-no-repeat py-[64px] md:py-[96px]"
                style={{
                    backgroundImage: "url(/assets/img/experience-figure.png)"
                }}
            >
                <div className="container">
                    <div
                        className="mx-auto border border-gray-200  w-5/6 bg-white py-[16px] shadow md:w-11/12 2xl:w-full"
                    >
                        <div className="p-8 grid  gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 ">
                            <ShareCards link={`https://wa.me/+91${objCompany.company_contact}`} iconName={faSquareWhatsapp} title="WhatsApp" value={`+91 ${objCompany.company_contact}`} />
                            <ShareCards iconName={faSquareShareNodes} title="Share With Friends" clickHandler={() => {
                                if (navigator.share) {
                                    navigator
                                        .share({
                                            title: objCompany.company_name || "N/A",
                                            text: "Take a look at this Site!",
                                            url: window.location.href,
                                        })
                                        .then(() => { })
                                        .catch((error: any) =>
                                            console.log("Error while sharing", error.message)
                                        );
                                } else {
                                    Utils.showErrorMessage(
                                        "Share not supported on this browser, do it with old way."
                                    );
                                }
                            }} content={
                                (<div className="social-icons flex justify-center lg:justify-start items-center flex-cols space-x-4">
                                    <span className="fb-icon">
                                        <FontAwesomeIcon
                                            className="text-[2rem] font-bold text-[#b2b2b2]"
                                            icon={faFacebookF}
                                        />
                                    </span>
                                    <span className="twt-icon">
                                        <FontAwesomeIcon
                                            className="text-[2rem] font-bold text-[#b2b2b2]"
                                            icon={faTwitter}
                                        />
                                    </span>
                                    <span className="insta-icon">
                                        <FontAwesomeIcon
                                            className="text-[2rem] font-bold text-[#b2b2b2]"
                                            icon={faInstagram}
                                        />
                                    </span>
                                    <span className="in-icon">
                                        <FontAwesomeIcon
                                            className="text-[2rem] font-bold text-[#b2b2b2]"
                                            icon={faLinkedinIn}
                                        />
                                    </span>
                                    <span className="tele-icon">
                                        <FontAwesomeIcon
                                            className="text-[2rem] font-bold text-[#b2b2b2]"
                                            icon={faTelegram}
                                        />
                                    </span>
                                </div>)
                            } />
                            <ShareCards iconName={faSave} clickHandler={onSaveCardClick} title="Save" value="Save VCard Contact" />
                            <ShareCards iconName={faClock} title=" Working Hours" value={`${Utils.getWorkingHours(
                                objCompany.working_hours_from
                            )} - ${Utils.getWorkingHours(objCompany.working_hours_to)}`} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

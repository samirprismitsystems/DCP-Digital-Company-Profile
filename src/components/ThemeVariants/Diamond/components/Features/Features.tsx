import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { faFacebookF, faInstagram, faLinkedinIn, faTelegram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import SingleFeature from "./SingleFeature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSave, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import SectionTitle from "./SectionTitle";

const Features = () => {
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
            <section
                id="features"
                className="bg-diamond-primary/[.03]  diamondMd:py-20 diamondLg:py-28"
            >
                <div className="container">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-14 diamondSm:grid-cols-2 diamondLg:grid-cols-4">
                        <SingleFeature link={`https://wa.me/+91${objCompany.company_contact}`} icon={faWhatsapp} title="WhatsApp" desc={`+91 ${objCompany.company_contact}`} />
                        <SingleFeature icon={faShareSquare} title="Share With Friends" clickHandler={() => {
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
                            (<div className="social-icons flex justify-start items-center flex-cols space-x-4">
                                <span className="fb-icon">
                                    <FontAwesomeIcon
                                        className="text-xl font-bold text-[#b2b2b2]"
                                        icon={faFacebookF}
                                    />
                                </span>
                                <span className="twt-icon">
                                    <FontAwesomeIcon
                                        className="text-xl font-bold text-[#b2b2b2]"
                                        icon={faTwitter}
                                    />
                                </span>
                                <span className="insta-icon">
                                    <FontAwesomeIcon
                                        className="text-xl font-bold text-[#b2b2b2]"
                                        icon={faInstagram}
                                    />
                                </span>
                                <span className="in-icon">
                                    <FontAwesomeIcon
                                        className="text-xl font-bold text-[#b2b2b2]"
                                        icon={faLinkedinIn}
                                    />
                                </span>
                                <span className="tele-icon">
                                    <FontAwesomeIcon
                                        className="text-xl font-bold text-[#b2b2b2]"
                                        icon={faTelegram}
                                    />
                                </span>
                            </div>)
                        } />
                        <SingleFeature icon={faSave} clickHandler={onSaveCardClick} title="Save" desc="Save VCard Contact" />
                        <SingleFeature icon={faClock} title="Working Hours" desc={`${Utils.getWorkingHours(
                            objCompany.working_hours_from
                        )} - ${Utils.getWorkingHours(objCompany.working_hours_to)}`} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;

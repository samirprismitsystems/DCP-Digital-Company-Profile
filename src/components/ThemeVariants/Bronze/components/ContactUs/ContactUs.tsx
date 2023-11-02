import { ThemeContextApi } from "@/pages/[slug]";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { faChevronRight, faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";

export default function ContactUs() {
    const objCompany = useContext(ThemeContextApi).company;
    const [isLoading, setIsLoading] = useState(false);
    const objItem = useContext(ThemeContextApi).company;
    const [objUserInfo, setObjUserInfo] = useState({
        name: "",
        email: "",
        mobile: "",
        message: "",
    });

    const onSave = async (e: any) => {
        try {
            e.preventDefault();
            if (isValidEmail(objUserInfo.email)) {
                setIsLoading(true);
                const formData = new FormData();
                formData.append("client_name", objUserInfo.name);
                formData.append("email_address", objUserInfo.email);
                formData.append("phone_number", objUserInfo.mobile);
                formData.append("message", objUserInfo.message);

                if (shouldAppendUserID(objItem)) {
                    formData.append("user_id", objItem.user_id || Utils.getUserID());
                }
                formData.append("company_id", objItem.company_id || Utils.getCompanyID());
                formData.append("isupdate", false as any);

                const res = await ApiService.createEnquiry(formData);
                if (!res.error) {
                    Utils.showSuccessMessage(res.message);
                    clearForm();
                } else {
                    Utils.showErrorMessage(res.message);
                }
            } else {
                Utils.showErrorMessage("Email is not valid. Please try again.");
            }
        } catch (ex: any) {
            Utils.showErrorMessage(ex.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to check if the email is valid
    function isValidEmail(email: string) {
        const emailRegex = /^([A-Za-z0-9_\-\.])+\@(gmail|GMAIL)\.com$/;
        return emailRegex.test(email);
    }



    function shouldAppendUserID(objItem: any) {
        return Utils.getUserID() || (objItem && objItem.user_id);
    }

    // Helper function to clear the form fields
    function clearForm() {
        setObjUserInfo({
            name: "",
            email: "",
            mobile: "",
            message: "",
        });
    }

    const setFieldValue = (obj: any) => {
        setObjUserInfo((prevState: any) => ({
            ...prevState,
            ...obj
        }))
    }
    return (
        <>
            <div className="container pt-[64px] pb-[30px] px-[16px] md:pt-[80px]">
                <h2
                    className="font-header text-[2.5rem] text-center font-header font-semibold uppercase text-bronze-primary sm:text-5xl lg:text-6xl"
                >
                    Contact Us
                </h2>
                <h3
                    id="contact"
                    className="pt-6 text-center font-header text-[1.8rem] font-medium text-black sm:text-[2rem] lg:text-[2.3rem]"
                >Have Any Questions?
                </h3>
                <form onSubmit={onSave} className="mx-auto w-full pt-10 sm:w-3/4">
                    <div className="flex flex-col md:flex-row xs:space-y-4 md:space-y-0">
                        <input
                            onChange={(e: any) => {
                                const userInput = e.target.value;
                                setFieldValue({ name: userInput })
                            }}
                            value={objUserInfo.name}
                            required
                            className="text-[1.8rem] mr-3 w-full rounded border border-gray-400 px-[16px] py-[12px] font-body text-black md:w-1/2 lg:mr-5"
                            placeholder="Name"
                            type="text"
                            id="name"
                        />
                        <input
                            onChange={(e: any) => {
                                const userInput = e.target.value;
                                setFieldValue({ email: userInput })
                            }}
                            value={objUserInfo.email}
                            required
                            className="text-[1.8rem] mr-3 w-full rounded border border-gray-400 px-[16px] py-[12px] font-body text-black md:w-1/2 lg:mr-5"
                            placeholder="Email"
                            type="email"
                            id="name"
                        />
                        <input
                            onChange={(e: any) => {
                                const userInput = e.target.value;
                                if (userInput.length <= 10) {
                                    setFieldValue({ mobile: userInput })
                                }
                            }}
                            value={objUserInfo.mobile}
                            required
                            className="text-[1.8rem] mr-3 w-full rounded border border-gray-400 px-[16px] py-[12px] font-body text-black md:w-1/2 lg:mr-5"
                            placeholder="Mobile"
                            type="number"
                            id="name"
                        />
                    </div>
                    <textarea
                        onChange={(e: any) => {
                            const userInput = e.target.value;
                            setFieldValue({ message: userInput })
                        }}
                        value={objUserInfo.message}
                        className="text-[1.8rem] mr-3  border border-gray-400  mt-6 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:mt-8"
                        placeholder="Message"
                        id="message"
                        cols={30}
                        rows={10}
                    ></textarea>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="mt-6 flex items-center justify-center rounded bg-bronze-primary px-10 py-4 font-header text-[1.8rem] font-semibold uppercase text-white text-left hover:bg-gray-200"
                    >
                        Send
                        <FontAwesomeIcon icon={faChevronRight} className="relative ml-4 text-3xl text-[2rem] text-white" />
                    </button>
                </form>
                <div className="container pt-[64px] pb-[64px] contactCardsForBronze">
                    <div className="mx-auto w-full pt-10 sm:w-3/4 flex flex-col lg:flex-row">
                        <div
                            className="w-full border border-gray-400 px-[24px] py-[32px] sm:py-[32px] lg:w-1/3"
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faPhone} className="text-[2rem] text-gray-400" />
                                <p className="pl-4 font-body font-semibold uppercase text-gray-400 text-[1.8rem] tracking-wide">
                                    My Phone
                                </p>
                            </div>
                            <p className="pt-4 text-left font-body text-bronze-primary font-semibold text-[2rem]">
                                {`+91 ${Utils.getContent(objCompany.company_contact)}`}
                            </p>
                        </div>
                        <div
                            className="w-full border  border-gray-400 px-[24px] py-[32px] sm:py-[32px] lg:w-1/3"
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faEnvelope} className="text-[2rem] text-gray-400 " />
                                <p className="pl-4 font-body font-semibold uppercase text-gray-400 text-[1.8rem] tracking-wide">
                                    My Email
                                </p>
                            </div>
                            <p className="pt-4 text-left font-body text-bronze-primary font-semibold text-[2rem]">
                                {Utils.getContent(objCompany.company_email)}
                            </p>
                        </div>
                        <div
                            className="w-full border border-gray-400 px-[24px] py-[32px] sm:py-[32px] lg:w-1/3"
                        >
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[2rem] text-gray-400 " />
                                <p className="pl-4 font-body font-semibold uppercase text-gray-400 text-[1.8rem] tracking-wide">
                                    My Address
                                </p>
                            </div>
                            <p className="pt-4 text-left font-body text-bronze-primary font-semibold text-[2rem]">
                                {Utils.getContent(objCompany.address)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[400px]">
                <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        objCompany.address
                    )}&z=15&output=embed`}
                    width="100%"
                    className="border-0 h-full"
                    allowFullScreen={true}
                />
            </div>
        </>
    )
}

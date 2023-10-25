import { ThemeContextApi } from "@/pages/[slug]";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { useContext, useState } from "react";
import global from "../../styles/platinum.module.scss";
import styles from "./styles/getInTouch.module.scss";

export default function GetInTouch() {
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
            <section id="contact" className="bg-platinum-gray contact_area relative pt-platinum18">
                <div className="container">
                    <div className={`${styles.contact_image} flex items-center justify-end`}>
                        <div className={`image platinumLg:pr-platinum13`}>
                            <img src="assets/themes/platinum/contact.svg" alt="about" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="w-full platinumLg:w-1/2">
                            <div className="contact_wrapper mt-platinum11">
                                <div className={`${global.section_title} pb-platinum4 text-left`}>
                                    <h5 className={global.sub_title}>Contact</h5>
                                    <h4 className={global.main_title}>Get In Touch</h4>
                                </div>

                                <div className="contact_form">
                                    <form id="contact-form" onSubmit={onSave}>
                                        <div className="">
                                            <div className="grid grid-cols-1 platinumXl:grid-cols-2 gap-4">
                                                <div className=" w-full">
                                                    <div className="single_form mt-platinum3 platinumLg:mt-platinum5 w-full">
                                                        <input onChange={(e: any) => {
                                                            setFieldValue({ name: e.target.value })
                                                        }} value={objUserInfo.name} required name="name" id="name" type="text" placeholder="Name" className="w-full rounded-md py-platinum4 px-platinum6 border border-solid border-platinum-body-color text-[1.5rem]" />
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <div className="single_form mt-platinum3 platinumLg:mt-platinum5">
                                                        <input onChange={(e: any) => {
                                                            setFieldValue({ email: e.target.value })
                                                        }} value={objUserInfo.email} required name="email" id="email" type="email" placeholder="Email" className="text-[1.5rem] w-full rounded-md py-platinum4 px-platinum6 border border-solid border-platinum-body-color" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <div className="single_form mt-8">
                                                    <input onChange={(e: any) => {
                                                        const mobile = e.target.value
                                                        if (mobile.length <= 10) {
                                                            setFieldValue({ mobile: mobile })
                                                        }
                                                    }} type="number" value={objUserInfo.mobile} required name="message" id="message" placeholder="Mobile" className="text-[1.5rem] w-full rounded-md py-platinum4 px-platinum6 border border-solid border-platinum-body-color resize-none"></input>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <div className="single_form mt-8">
                                                    <textarea onChange={(e: any) => {
                                                        setFieldValue({ message: e.target.value })
                                                    }} value={objUserInfo.message} required name="message" id="message" placeholder="Message" rows={5} className="text-[1.5rem] w-full rounded-md py-platinum4 px-platinum6 border border-solid border-platinum-body-color resize-none"></textarea>
                                                </div>
                                            </div>
                                            <p className="form-message mx-platinum3"></p>
                                            <div className="w-full">
                                                <div className="single_form mt-platinum3 platinumLg:mt-platinum5 float-left">
                                                    <button disabled={isLoading} type="submit" className={`text-[5.8rem] ${styles.mainBtn} ${styles.contactBtn}`}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

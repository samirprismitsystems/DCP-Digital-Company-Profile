import { ThemeContextApi } from "@/pages/[slug]";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { useContext, useState } from "react";

const ContactUs = () => {
    const objCompany = useContext(ThemeContextApi).company;
    const [objUser, setObjUser] = useState({
        name: "",
        email: "",
        mobile: "",
        message: "",
    })

    const setFieldValue = (obj: any) => {
        setObjUser((prevState: any) => ({
            ...prevState,
            ...obj,
        }));
    }

    const onSave = async (e: any) => {
        try {
            e.preventDefault();
            const io: any = new FormData();
            io.append("client_name", objUser.name);
            io.append("email_address", objUser.email);
            io.append("phone_number", objUser.mobile);
            io.append("message", objUser.message);
            if (Utils.getUserID() || objCompany.user_id) {
                io.append("user_id", objCompany.user_id || Utils.getUserID());
            }
            io.append("company_id", objCompany.company_id || Utils.getCompanyID());
            io.append("isupdate", false);

            const res = await ApiService.createEnquiry(io);
            if (!res.error) {
                Utils.showSuccessMessage(res.message);
                setObjUser({
                    name: "",
                    email: "",
                    mobile: "",
                    message: "",
                });
                return null;
            }

        } catch (ex: any) {
            Utils.showErrorMessage(ex.message)
        }
    }

    return (
        <section className="overflow-hidden pt-16 diamondMd:pt-20 diamondLg:pt-28">
            <div className="container mx-auto">
                <div className="w-full flex flex-wrap">
                    <div className="w-full mx-auto">
                        <div
                            className="wow fadeInUp mb-12 rounded-md bg-diamond-primary/[3%] py-11 px-8 dark:bg-diamond-dark diamondSm:p-[55px] diamondLg:mb-5 diamondLg:px-8 xl:p-[55px]"
                            data-wow-delay=".15s
              "
                        >
                            <h2 className="mb-3 text-2xl font-bold text-black dark:text-diamond-white diamondSm:text-3xl diamondLg:text-2xl xl:text-3xl">
                                Contact Us
                            </h2>
                            <p className="mb-12 text-base font-medium text-diamond-body-color">
                                Our support team will get back to you ASAP via email.
                            </p>
                            <form onSubmit={onSave}>
                                <div className="-mx-4">
                                    <div className="grid grid-cols-1 diamondLg:grid-cols-3">
                                        <div className="w-full mb-8 px-4">
                                            <label
                                                htmlFor="name"
                                                className="mb-3 block text-sm font-medium text-diamond-dark dark:text-diamond-white"
                                            >
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                onChange={(e: any) => {
                                                    setFieldValue({
                                                        name: e.target.value
                                                    })
                                                }}
                                                value={objUser.name}
                                                required
                                                placeholder="Enter your name"
                                                className="w-full rounded-md border border-diamond-transparent py-3 px-6 text-base text-diamond-body-color placeholder-diamond-body-color shadow-one outline-none focus:border-diamond-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp bg-white"
                                            />
                                        </div>
                                        <div className="w-full mb-8 px-4">
                                            <label
                                                htmlFor="email"
                                                className="mb-3 block text-sm font-medium text-diamond-dark bg-transparent dark:text-diamond-white"
                                            >
                                                Your Email
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                onChange={(e: any) => {
                                                    setFieldValue({
                                                        email: e.target.value
                                                    })
                                                }}
                                                value={objUser.email}
                                                placeholder="Enter your email"
                                                className="w-full rounded-md border border-transparent py-3 bg-white px-6 text-base text-diamond-body-color placeholder-diamond-body-color shadow-one outline-none focus:border-diamond-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                            />
                                        </div>
                                        <div className="w-full mb-8 px-4">
                                            <label
                                                htmlFor="email"
                                                className="mb-3 block text-sm font-medium text-diamond-dark bg-transparent dark:text-diamond-white"
                                            >
                                                Your Mobile
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                onChange={(e: any) => {
                                                    const userInput = e.target.value;
                                                    if (userInput.length <= 10) {
                                                        setFieldValue({
                                                            mobile: userInput,
                                                        });
                                                    }
                                                }}
                                                value={objUser.mobile}
                                                placeholder="Enter your mobile"
                                                className="w-full rounded-md border border-transparent py-3 bg-white px-6 text-base text-diamond-body-color placeholder-diamond-body-color shadow-one outline-none focus:border-diamond-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <div className="mb-8">
                                            <label
                                                htmlFor="message"
                                                className="mb-3 bg-transparent block text-sm font-medium text-diamond-dark dark:text-diamond-white"
                                            >
                                                Your Message
                                            </label>
                                            <textarea
                                                name="message"
                                                rows={5}
                                                required
                                                onChange={(e: any) => {
                                                    setFieldValue({
                                                        message: e.target.value
                                                    })
                                                }}
                                                value={objUser.message}
                                                placeholder="Enter your Message"
                                                className="bg-white w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-diamond-body-color placeholder-diamond-body-color shadow-one outline-none focus:border-diamond-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="w-full px-4">
                                        <button type="submit" className="rounded-md bg-diamond-primary py-4 px-9 text-base font-medium text-diamond-white transition-all duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp ">
                                            Send Enquiry
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;

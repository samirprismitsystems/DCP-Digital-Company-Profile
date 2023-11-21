import { ThemeContextApi } from "@/pages/[slug]";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { useContext, useState } from "react";
import Ratting from "./Ratting";

interface IGetFeedBackProps {
    title?: string;
    buttonTitle?: string;
    addEmailMobile?: boolean;
    isAnotherSubmit?: boolean;
}

export default function GetFeedBack(props: IGetFeedBackProps) {
    const objCompany = useContext(ThemeContextApi).company;
    const [objFeedback, setObjFeedback] = useState({
        clientName: "",
        email: "",
        comment: "",
        phoneNumber: "",
    });

    const [rate, setRate] = useState(0);
    const onSave = async (e: any) => {
        try {
            e.preventDefault();
            if (props.addEmailMobile) {
                if (objFeedback.phoneNumber.length !== 10) {
                    Utils.showErrorMessage("Mobile number must be 10 digit!");
                    return null;
                }
            }
            const io: any = new FormData();
            io.append("client_name", objFeedback.clientName);
            io.append("email_address", objFeedback.email);
            if (!props.isAnotherSubmit) {
                io.append("ratting", rate);
                io.append("comment", objFeedback.comment);
            }
            io.append("company_id", objCompany.company_id || Utils.getCompanyID());
            io.append("isupdate", false);

            if (props.isAnotherSubmit) {
                io.append("message", objFeedback.comment);
                io.append("phone_number", objFeedback.phoneNumber);
                if (Utils.getUserID() || objCompany.user_id) {
                    io.append("user_id", Utils.getUserID() || objCompany.user_id);
                }
            }

            if (props.isAnotherSubmit) {
                const res = await ApiService.createEnquiry(io);

                if (!res.error) {
                    Utils.showSuccessMessage(res.message);
                    setObjFeedback({
                        clientName: "",
                        comment: "",
                        email: "",
                        phoneNumber: "",
                    });
                    return null;
                }

                throw new Error(res.message);
            } else {
                const res = await ApiService.createTestimonial(io);
                if (!res.error) {
                    Utils.showSuccessMessage(res.message);
                    setObjFeedback({
                        clientName: "",
                        comment: "",
                        email: "",
                        phoneNumber: "",
                    });
                    setRate(1)
                    return null;
                }

                throw new Error(res.message);
            }
        } catch (ex: any) {
            Utils.showErrorMessage(ex.message);
        }
    };

    const handleOnChange = (obj: any) => {
        setObjFeedback((prevState: any) => ({
            ...prevState,
            ...obj,
        }));
    };

    return (
        <>
            <div id="portfolio">
                <div className='container  w-full min-w-7xl py-48 px-4 lg:px-8'>
                    <h3 className="c-text text-center text-[3rem] pb-4 pt-6 font-bold text-portfolioTheme-titleColor">
                        {props.title || "Write Review"}
                    </h3>
                    <form id="feedback_form" className="mt-8 px-0  md:px-72" onSubmit={onSave}>
                        {!props.addEmailMobile && (
                            <div className="row flex flex-wrap justify-center items-center -mx-3">
                                <div className="flex justify-center items-center">
                                    <p className="start-ratting flex text-center  mb-8 text-base mt-0">
                                        <Ratting
                                            rating={rate}
                                            onRating={(rattingValue: number) => {
                                                setRate(rattingValue);
                                            }}
                                        />
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className={`${!props.addEmailMobile ? "grid grid-cols-2 gap-8" : "grid grid-cols-3 gap-8"}`}>
                            <input
                                required={true}
                                type="text"
                                value={objFeedback.clientName || ""}
                                className="placeholder:text-black focus-within:outline-none border-[1px] border-solid border-black py-6 bg-white w-full px-4 mb-6 text-2xl"
                                placeholder="Enter Your Name"
                                onChange={(e: any) => {
                                    handleOnChange({
                                        clientName: e.target.value,
                                    });
                                }}
                            />
                            <input
                                type="email"
                                value={objFeedback.email || ""}
                                required={true}
                                className="placeholder:text-black focus-within:outline-none border-[1px] border-solid border-black py-6 bg-white w-full px-4 mb-6 text-2xl"
                                placeholder="Enter Your Email"
                                onChange={(e: any) => {
                                    handleOnChange({
                                        email: e.target.value,
                                    });
                                }}
                            />
                            {props.addEmailMobile && (
                                <>
                                    <input
                                        type="number"
                                        value={objFeedback.phoneNumber || ""}
                                        required={true}
                                        className="placeholder:text-black focus-within:outline-none border-[1px] border-solid border-black  bg-white w-full py-6 px-4 mb-6 text-2xl"
                                        placeholder="Enter Your Mobile No"
                                        onChange={(e: any) => {
                                            const userInput = e.target.value;
                                            if (userInput.length <= 10)
                                                handleOnChange({
                                                    phoneNumber: userInput,
                                                });
                                        }}
                                    />
                                </>
                            )}
                        </div>
                        <textarea
                            className="placeholder:text-black focus-within:outline-none border-[1px] border-solid border-black  bg-white w-full px-4 mb-6 text-2xl"
                            cols={5}
                            rows={10}
                            value={objFeedback.comment || ""}
                            required={true}
                            placeholder="Enter Your Feedback"
                            onChange={(e: any) => {
                                handleOnChange({
                                    comment: e.target.value,
                                });
                            }}
                        />
                        <button type='submit' className={`bg-silver-Blueviolet text-center transition-all duration-300  py-4 text-[1.6rem] block mx-auto font-medium px-8 c-text text-white`}>{props.buttonTitle || "Submit"}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

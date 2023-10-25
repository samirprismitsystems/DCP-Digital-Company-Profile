import Utils from "@/services/Utils";
import { useState } from "react";
import global from "../../styles/platinum.module.scss";
import styles from "./styles/getInTouch.module.scss";

export default function GetInTouch() {
    const [isLoading, setIsLoading] = useState(false);

    const onSave = async (e: any) => {
        try {
            e.preventDefault()
            setIsLoading(true)
        } catch (ex: any) {
            Utils.showErrorMessage(ex.message)
        } finally {
            setIsLoading(false)
        }

    }
    return (
        <>
            <section id="contact" className="bg-platinum-gray contact_area relative pt-platinum18 pb-platinum120">
                <div className={`${styles.contact_image} flex items-center justify-end`}>
                    <div className={`image platinumLg:pr-platinum13`}>
                        <img src="assets/themes/platinum/contact.svg" alt="about" />
                    </div>
                </div>

                <div className="container">
                    <div className="flex justify-end">
                        <div className="w-full platinumLg:w-1/2">
                            <div className="contact_wrapper mt-platinum11">
                                <div className={`${global.section_title} pb-platinum4`}>
                                    <h5 className={global.sub_title}>Contact</h5>
                                    <h4 className={global.main_title}>Get In Touch</h4>
                                    <p>Lorem ipsum dolor sitrg amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
                                </div>

                                <div className="contact_form">
                                    <form id="contact-form" onSubmit={onSave}>
                                        <div className="">
                                            <div className="grid grid-cols-1 platinumXl:grid-cols-2 gap-4">
                                                <div className=" w-full">
                                                    <div className="single_form mt-platinum8 w-full">
                                                        <input name="name" id="name" type="text" placeholder="Name" className="w-full rounded-md py-platinum4 px-platinum6 border border-solid border-platinum-body-color text-[1.5rem]" />
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <div className="single_form mt-platinum8">
                                                        <input name="email" id="email" type="email" placeholder="Email" className="text-[1.5rem] w-full rounded-md py-platinum4 px-platinum6 border border-solid border-platinum-body-color" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <div className="single_form mt-8">
                                                    <textarea name="message" id="message" placeholder="Message" rows={5} className="text-[1.5rem] w-full rounded-md py-platinum4 px-platinum6 border border-solid border-platinum-body-color resize-none"></textarea>
                                                </div>
                                            </div>
                                            <p className="form-message mx-platinum3"></p>
                                            <div className="w-full">
                                                <div className="mx-platinum3">
                                                    <div className="single_form mt-platinum8">
                                                        <button type="submit" className={`text-[5.8rem] ${styles.mainBtn} ${styles.contactBtn}`}>Submit</button>
                                                    </div>
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

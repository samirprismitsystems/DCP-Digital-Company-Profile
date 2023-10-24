import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useContext } from "react";
import styles from "./styles/services.module.scss";


export default function Services() {
    const objItem = useContext(ThemeContextApi).service;
    return (
        <section id="services" className="bg-white services_area pt-platinum120 pb-platinum120">
            <div className="container">
                <div className="flex items-center justify-center">
                    <div className="w-full">
                        <div className={`${styles.section_title} text-center pb-platinum6`}>
                            <h5 className={styles.sub_title}>What We Do</h5>
                            <h4 className={styles.main_title}>Our Services</h4>
                        </div>
                    </div>
                </div>
                <div className="grid platinumSm:grid-cols-1 platinumMd:grid-cols-2 platinumXl:grid-cols-3 gap-8">
                    {objItem && objItem.map((item) => (
                        <div className="w-full">
                            <div className={`${styles.single_services} text-center mt-platinum8 mx-platinum3`}>
                                <div className={`${styles.services_icon} flex items-center justify-center`}>
                                    <img src={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()}/service/${item.service_image}`} className={styles.services_shape} alt="" />
                                </div>
                                <div className="services_content mt-platinum5 platinumXl:mt-platinum10">
                                    <h3 className="services_title text-black font-semibold text-xl platinumMd:text-2xl platinumLg:text-xl platinumXl:text-3xl">{Utils.getContent(item.service_name)}</h3>
                                    <p className="mt-platinum4">{Utils.getContent(item.service_desc)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

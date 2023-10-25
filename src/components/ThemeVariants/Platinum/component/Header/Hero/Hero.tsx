import { ThemeContextApi } from "@/pages/[slug]";
import { useContext } from "react";
import styles from "./styles/hero.module.scss";
import Utils from "@/services/Utils";
import Link from "next/link";

export default function Hero() {
    const objItem = useContext(ThemeContextApi).company;

    return (
        <>
            <div id="home" className={`${styles.header_hero} bg-platinum-gray relative z-10 overflow-hidden platinumLg:flex items-center`}>
                <div className={`${styles.hero_shape} ${styles.shape_1}`}>
                    <img src="assets/themes/platinum/shape/shape-1.svg" alt="shape" />
                </div>
                <div className={`${styles.hero_shape} ${styles.shape_2}`}>
                    <img src="assets/themes/platinum/shape/shape-2.svg" alt="shape" />
                </div>
                <div className={`${styles.hero_shape} ${styles.shape_3}`}>
                    <img src="assets/themes/platinum/shape/shape-3.svg" alt="shape" />
                </div>
                <div className={`${styles.hero_shape} ${styles.shape_4}`}>
                    <img src="assets/themes/platinum/shape/shape-4.svg" alt="shape" />
                </div>
                <div className={`${styles.hero_shape} ${styles.shape_6}`}>
                    <img src="assets/themes/platinum/shape/shape-1.svg" alt="shape" />
                </div>
                <div className={`${styles.hero_shape} ${styles.shape_7}`}>
                    <img src="assets/themes/platinum/shape/shape-4.svg" alt="shape" />
                </div>
                <div className={`${styles.hero_shape} ${styles.shape_8}`}>
                    <img src="assets/themes/platinum/shape/shape-3.svg" alt="shape" />
                </div>
                <div className={`${styles.hero_shape} ${styles.shape_9}`}>
                    <img src="assets/themes/platinum/shape/shape-2.svg" alt="shape" />
                </div>
                <div className={`${styles.hero_shape} ${styles.shape_10}`}>
                    <img src="assets/themes/platinum/shape/shape-4.svg" alt="shape" />
                </div>
                <div className={`${styles.hero_shape} ${styles.shape_11}`}>
                    <img src="assets/themes/platinum/shape/shape-1.svg" alt="shape" />
                </div>
                <div className={`${styles.hero_shape} ${styles.shape_12}`}>
                    <img src="assets/themes/platinum/shape/shape-2.svg" alt="shape" />
                </div>

                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full platinumLg:w-1/2">
                            <div className="header_hero_content pt-platinum150 platinumLg:pt-platinum0">
                                <h2 className="hero_title text-[3.5rem] leading-snug platinumSm:text-5xl platinumMd:text-6xl platinumLg:text-5xl platinumXl:text-[4rem] font-extrabold">{Utils.getContent(objItem.company_name)} <span className="text-platinum-theme-color">{Utils.getContent(objItem.business_segment)}</span></h2>
                                <p className="mt-platinum8 platinumLg:mr-platinum8">{Utils.getContent(objItem.company_desc)}</p>
                                <div className="hero_btn mt-platinum10">
                                    <Link href={'/login'} target="_blank" className={styles.mainBtn} type="button">Get Started</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.header_shape} hidden platinumLg:block`}></div>

                    <div className={`${styles.header_image} flex items-center`}>
                        <div className="image platinum2xl:pl-platinum25">
                            <img src="assets/themes/platinum/header-image.svg" alt="Header Image" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

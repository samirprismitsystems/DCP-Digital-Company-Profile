import Utils from '@/services/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { navbarList } from "./data/data";
import styles from "./styles/appBar.module.scss";

export default function AppBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileView, setIsMobileView] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const sectionList: any = {
            home: 0,
            product: isMobileView ? 2200 : 1080,
            service: isMobileView ? 3000 : 1880,
            gallery: isMobileView ? 3611 : 2768,
            contact: isMobileView ? 4520 : 3883,
        }

        for (let item in sectionList) {
            let activeCurrentItemRange = sectionList[item];
            if (scrollTop > activeCurrentItemRange) {
                setActiveSection(item as any)
            }
        }
    };


    useEffect(() => {
        const handleResize = () => {


            if (window.innerWidth >= 425 && window.innerWidth <= 750) {
                setIsMobileView(false)
            }

            if (window.innerWidth <= 425) {
                setIsMobileView(true)
            }

            if (window.innerWidth < 760) {
                setIsMobileScreen(true);
            } else {
                setIsMobileScreen(false);
            }
        };

        handleResize();
        handleScroll();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    useEffect(() => {
        if (isOpen) {
            document.body.className = `${styles.showMenu}`
        } else {
            document.body.className = ''
        }
    }, [isOpen])

    return (
        <section>
            <div className={`${styles.menuWrap} ${isOpen ? "mt-0" : "mt-8"}`}>
                <nav className={`${styles.menu}`}>
                    <div className={`${styles.iconList} xs:w-full xsOne:w-2/3 md:w-full px-[2rem] flex items-center justify-end xs:flex-col md:flex-row`}>
                        {navbarList.map((item, index: number) => (
                            <div key={index} onClick={() => {
                                Utils.scrollToView(item.link, isMobileScreen ? -40 : 80)
                                if (isMobileScreen)
                                    toggle();
                            }} className={`group hover:cursor-pointer md:px-[0.2em] md:py-0 xs:py-8 md:py-auto xs:w-full md:w-auto ${styles.iconListDiv} flex items-center justify-center flex-col px-8 border-b border-dashed hover:border-b-gold-primary  ${activeSection === item.link ? 'border-b-gold-primary' : "border-b-black"}`}>
                                <FontAwesomeIcon
                                    className={`text-black xs:text-[2rem] md:text-[1.8rem] ${activeSection === item.link ? 'goldNavItemActive' : ""}`}
                                    icon={item.icon}
                                />
                                <span className={`${activeSection === item.link ? 'goldNavItemActive' : ""} inline-block text-black xs:text-[2rem] md:text-[1.3rem] pt-4 uppercase`}>{item.name}</span>
                            </div>
                        ))}

                    </div>
                </nav>
            </div>
            <div className={`bg-gold-white pt-8`}>
                <button onClick={toggle} className={`${styles.menuButton}`} id="open-button"></button>
            </div>
        </section>
    )
}

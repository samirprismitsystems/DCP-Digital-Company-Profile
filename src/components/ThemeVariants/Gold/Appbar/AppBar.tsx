import Utils from '@/services/Utils';
import { faEnvelope, faGlobe, faHome, faImage, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styles from "./styles/appBar.module.scss";

export default function AppBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);
<<<<<<< HEAD
    const [activeSection, setActiveSection] = useState('home');

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const sectionList: any = {
            home: 0,
            product: 1080,
            service: 1880,
            gallery: 2460,
            contact: 3450,
        }

        for (let item in sectionList) {
            let activeCurrentItemRange = sectionList[item];
            if (scrollTop > activeCurrentItemRange) {
                setActiveSection(item as any)
            }
        }
    };

=======
>>>>>>> parent of a29d01f (add update new code 09/11/2023)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setIsMobileScreen(true);
            } else {
                setIsMobileScreen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
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
<<<<<<< HEAD
                        {navbarList.map((item, index: number) => (
                            <div key={index} onClick={() => {
                                Utils.scrollToView(item.link, 80)
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

=======
                        <div onClick={() => {
                            Utils.scrollToView('home')
                            if (isMobileScreen)
                                toggle();
                        }} className={`group hover:cursor-pointer md:px-[0.2em] md:py-0 xs:py-8 md:py-auto xs:w-full md:w-auto ${styles.iconListDiv} flex items-center justify-center flex-col px-8`}>
                            <FontAwesomeIcon className='text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.8rem]' icon={faHome} />
                            <span className='inline-block text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.3rem] pt-4 uppercase'>Home </span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('about')
                            if (isMobileScreen)
                                toggle();
                        }} className={`group hover:cursor-pointer md:px-[0.2em] md:py-0 xs:py-8 md:py-auto xs:w-full md:w-auto ${styles.iconListDiv} flex items-center justify-center flex-col px-8`}>
                            <FontAwesomeIcon className='text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.8rem]' icon={faQuoteLeft} />
                            <span className='inline-block text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.3rem] pt-4 uppercase'>About </span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('service')
                            if (isMobileScreen)
                                toggle();
                        }} className={`group hover:cursor-pointer md:px-[0.2em] md:py-0 xs:py-8 md:py-auto xs:w-full md:w-auto ${styles.iconListDiv} flex items-center justify-center flex-col px-8 `}>
                            <FontAwesomeIcon className='text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.8rem]' icon={faGlobe} />
                            <span className='inline-block text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.3rem] pt-4 uppercase'>Service </span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('gallery')
                            if (isMobileScreen)
                                toggle();
                        }} className={`group hover:cursor-pointer md:px-[0.2em] md:py-0 xs:py-8 md:py-auto xs:w-full md:w-auto ${styles.iconListDiv} flex items-center justify-center flex-col px-8`}>
                            <FontAwesomeIcon className='text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.8rem]' icon={faImage} />
                            <span className='inline-block text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.3rem] pt-4 uppercase'>Portfolio </span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('contact')
                            if (isMobileScreen)
                                toggle();
                        }} className={`group hover:cursor-pointer md:px-[0.2em] md:py-0 xs:py-8 md:py-auto xs:w-full md:w-auto ${styles.iconListDiv} flex items-center justify-center flex-col px-8`}>
                            <FontAwesomeIcon className='text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.8rem]' icon={faEnvelope} />
                            <span className='inline-block text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.3rem] pt-4 uppercase'>Contact </span>
                        </div>
>>>>>>> parent of a29d01f (add update new code 09/11/2023)
                    </div>
                </nav>
            </div>
            <div className={`bg-gold-white pt-8`}>
                <button onClick={toggle} className={`${styles.menuButton}`} id="open-button"></button>
            </div>
        </section>
    )
}

import Utils from '@/services/Utils';
import { faEnvelope, faGlobe, faHome, faImage, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export default function AppBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);

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
            document.body.className = 'show-menu'
        } else {
            document.body.className = ''
        }
    }, [isOpen])

    return (
        <section>
            <div className={`menu-wrap xs:h-screen md:h-[125px] ${isOpen ? "mt-0" : "mt-8"}`}>
                <nav className="menu">
                    <div className="icon-list xs:w-full xsOne:w-2/3 md:w-full px-[2rem] flex items-center justify-end xs:flex-col md:flex-row">
                        <div onClick={() => {
                            Utils.scrollToView('home')
                            if (isMobileScreen)
                                toggle();
                        }} className='group hover:cursor-pointer md:px-[0.2em] md:py-0 xs:py-8 md:py-auto xs:w-full md:w-auto icon-list-div flex items-center justify-center flex-col px-8'>
                            <FontAwesomeIcon className='text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.8rem]' icon={faHome} />
                            <span className='inline-block text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.3rem] pt-4 uppercase'>Home </span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('about')
                            if (isMobileScreen)
                                toggle();
                        }} className='group hover:cursor-pointer md:px-[0.2em] md:py-0 xs:py-8 md:py-auto xs:w-full md:w-auto icon-list-div flex items-center justify-center flex-col px-8'>
                            <FontAwesomeIcon className='text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.8rem]' icon={faQuoteLeft} />
                            <span className='inline-block text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.3rem] pt-4 uppercase'>About </span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('service')
                            if (isMobileScreen)
                                toggle();
                        }} className='group hover:cursor-pointer md:px-[0.2em] md:py-0 xs:py-8 md:py-auto xs:w-full md:w-auto icon-list-div flex items-center justify-center flex-col px-8'>
                            <FontAwesomeIcon className='text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.8rem]' icon={faGlobe} />
                            <span className='inline-block text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.3rem] pt-4 uppercase'>Service </span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('gallery')
                            if (isMobileScreen)
                                toggle();
                        }} className='group hover:cursor-pointer md:px-[0.2em] md:py-0 xs:py-8 md:py-auto xs:w-full md:w-auto icon-list-div flex items-center justify-center flex-col px-8'>
                            <FontAwesomeIcon className='text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.8rem]' icon={faImage} />
                            <span className='inline-block text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.3rem] pt-4 uppercase'>Portfolio </span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('contact')
                            if (isMobileScreen)
                                toggle();
                        }} className='group hover:cursor-pointer md:px-[0.2em] md:py-0 xs:py-8 md:py-auto xs:w-full md:w-auto icon-list-div flex items-center justify-center flex-col px-8'>
                            <FontAwesomeIcon className='text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.8rem]' icon={faEnvelope} />
                            <span className='inline-block text-black group-hover:text-gold-primary xs:text-[2rem] md:text-[1.3rem] pt-4 uppercase'>Contact </span>
                        </div>
                    </div>
                </nav>
            </div>
            <div className={`bg-gold-white pt-8`}>
                <button onClick={toggle} className="menu-button" id="open-button"></button>
            </div>
        </section>
    )
}

import Utils from '@/services/Utils';
import { faBars, faGlobe, faHome, faImage, faQuoteLeft, faRss } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';

export default function AppBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <>
            <div className={`fixed z-10 ${isOpen ? "w-full px-16" : "w-0"} h-[125px]  flex bg-white shadow-sm border-b border-b-red-400 transition-all duration-700 ease-in-out  items-center justify-end`}>
                <ul>
                    <li className='flex items-center justify-center'>
                        <div onClick={() => {
                            Utils.scrollToView('home')
                        }} className='group flex items-center justify-center hover:cursor-pointer flex-col px-8'>
                            <FontAwesomeIcon className='group-hover:text-gold-primary text-black text-[1.8rem]' icon={faHome} />
                            <span className='inline-block text-black text-[1.3rem] pt-4 border-b-black group-hover:border-b-gold-primary border-b-[2px]  group-hover:text-gold-primary border-dotted'>HOME</span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('about')
                        }} className='group flex items-center justify-center hover:cursor-pointer flex-col px-8'>
                            <FontAwesomeIcon className='group-hover:text-gold-primary text-black text-[1.8rem]' icon={faQuoteLeft} />
                            <span className='inline-block text-black text-[1.3rem] pt-4 border-b-black group-hover:border-b-gold-primary border-b-[2px]  group-hover:text-gold-primary border-dotted'>ABOUT</span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('service')
                        }} className='group flex items-center justify-center hover:cursor-pointer flex-col px-8'>
                            <FontAwesomeIcon className='group-hover:text-gold-primary text-black text-[1.8rem]' icon={faGlobe} />
                            <span className='inline-block text-black text-[1.3rem] pt-4 border-b-black group-hover:border-b-gold-primary border-b-[2px]  group-hover:text-gold-primary border-dotted'>SERVICE</span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('gallery')
                        }} className='group flex items-center justify-center hover:cursor-pointer flex-col px-8'>
                            <FontAwesomeIcon className='group-hover:text-gold-primary text-black text-[1.8rem]' icon={faImage} />
                            <span className='inline-block text-black text-[1.3rem] pt-4 border-b-black group-hover:border-b-gold-primary border-b-[2px]  group-hover:text-gold-primary border-dotted'>PORTFOLIO</span>
                        </div>
                        <div onClick={() => {
                            Utils.scrollToView('contact')
                        }} className='group flex items-center justify-center hover:cursor-pointer flex-col px-8'>
                            <FontAwesomeIcon className='group-hover:text-gold-primary text-black text-[1.8rem]' icon={faRss} />
                            <span className='inline-block text-black text-[1.3rem] pt-4 border-b-black group-hover:border-b-gold-primary border-b-[2px]  group-hover:text-gold-primary border-dotted'>CONTACT US</span>
                        </div>
                    </li>
                </ul>
                <button type='button' onClick={toggle} className='bg-white p-4 shadow-md fixed z-10 left-[4rem] top-[4rem]'>
                    <FontAwesomeIcon className='text-gold-primary font-bold text-[3rem]' icon={faBars} />
                </button>
            </div>
        </>
    )
}

import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { UPLOAD_IMAGE_URI } from '@/services/config';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { Link as ScrollLink } from "react-scroll";

interface NavigationItem {
    name: string;
    href: string;
}

const navigation: NavigationItem[] = [
    { name: 'Home', href: 'home' },
    { name: 'Products', href: 'products' },
    { name: 'Services', href: 'services' },
    { name: 'Portfolio', href: 'portfolio' },
    { name: 'Contact', href: 'contact' },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Header = () => {
    const objCompany = useContext(ThemeContextApi).company;
    const [isActive, setIsActive] = useState(false);
    const [currentLink, setCurrentLink] = useState('home'); // Initial link

    const toggle = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <div  className="navbar">
                <div className='container'>
                    <div className="mx-auto min-w-7xl w-full px-6 py-8 lg:px-8">
                        <div className="relative flex h-12 md:h-20 items-center justify-between">
                            <div className="flex flex-1 items-center justify-between">
                                {/* LOGO */}
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="w-full h-24"
                                        src={`${UPLOAD_IMAGE_URI}/${objCompany.company_id || Utils.getCompanyID()}/logo/${objCompany.company_logo}`}
                                        alt="dsign-logo"
                                    />
                                </div>

                                {/* LINKS */}
                                <div className="hidden md:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <ScrollLink
                                                key={item.name}
                                                to={item.href}
                                                spy={true}
                                                smooth={true}
                                                offset={-50}
                                                duration={0}
                                            >
                                                <span
                                                    onClick={() => {
                                                        setCurrentLink(item.href)
                                                    }}
                                                    className={classNames(
                                                        item.href === currentLink ? 'underline-links' : 'text-silver-common',
                                                        'px-3 py-4 text-2xl md:text-3xl opacity-75 hover:opacity-100 hover:cursor-pointer'
                                                    )}
                                                >
                                                    {item.name}
                                                </span>
                                            </ScrollLink>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='block md:hidden'>
                                <button onClick={toggle} className={`navbar-toggler focus:outline-none block ${isActive ? 'active' : ''}`} type="button">
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`top-0 right-0 transition-all duration-500 ease-in fixed z-10 ${isActive ? 'p-4 w-[300px]' : 'w-0'} bg-[#f6faff] h-screen z-[999999999]`}>
                <div className="text-right">
                    <button onClick={toggle}>
                        <FontAwesomeIcon icon={faClose} className="text-[4rem] m-4 text-black" />
                    </button>
                </div>
                <div className="container">
                    <ul className="flex items-start justify-center flex-col">


                        {navigation.map((item, index: number) => (
                            <ScrollLink
                                key={item.name}
                                to={item.href}
                                spy={true}
                                smooth={true}
                                offset={-50}
                                duration={0}
                            >
                                <li key={index} className="group pl-6 mb-12" onClick={() => {
                                    setCurrentLink(item.href)
                                }}>
                                    <span
                                        className="cursor-pointer pt-0.5 font-header text-[2rem] font-semibold uppercase text-black"
                                    >{item.name}</span>

                                    <span
                                        className={classNames(
                                            item.href === currentLink ? 'underline-links' : 'text-slategray',
                                            'px-3 py-4 text-2xl md:text-3xl opacity-75 hover:opacity-100 hover:cursor-pointer'
                                        )}
                                    ></span>
                                </li>
                            </ScrollLink>
                        ))}
                    </ul >
                </div>
            </div>
        </>
    );
};

export default Header;

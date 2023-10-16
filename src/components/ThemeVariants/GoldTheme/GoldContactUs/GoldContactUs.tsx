import { ThemeContextApi } from '@/pages/[slug]';
import ApiService from '@/services/ApiServices';
import Utils from '@/services/Utils';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import GoldThemeMap from '../GoldThemeMap/GoldThemeMap';
import GoldContactCard from './ContactCard/GoldContactCard';
import GoldFollowUs from './FollowUs/GoldFollowUs';

export default function GoldContactUs() {
    const objItem = useContext(ThemeContextApi).company;
    const [objUser, setObjUser] = useState({
        name: "",
        email: "",
        mobile: "",
        message: "",
    })

    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);



    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 580) {
                setIsMobile(true);
                setIsTablet(false);
            }

            if (window.innerWidth > 580) {
                setIsTablet(true);
                setIsMobile(false)
            }

            if (window.innerWidth > 849) {
                setIsTablet(false);
                setIsMobile(false)
            }

        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
            if (Utils.getUserID() || objItem.user_id) {
                io.append("user_id", objItem.user_id || Utils.getUserID());
            }
            io.append("company_id", objItem.company_id || Utils.getCompanyID());
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


    if (!objItem) return null;
    return (
        <section className='py-24 bg-white relative text-center block'>
            <div className="container">
                <div className='flex xs:flex-wrap gap-y-6 lg:flex-nowrap'>
                    <GoldContactCard isMobile={isMobile} title='Contact Number' value={`+91 ${objItem.company_contact}`} iconName={faPhone} />
                    <GoldContactCard isMobile={isMobile} title='Email Address' value={objItem.company_email} iconName={faEnvelope} />
                    <GoldContactCard isTablet={isTablet} isMobile={isMobile} title='Address' value={objItem.address} iconName={faMapMarkerAlt} />
                </div>
                <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-8 pt-24">
                    <GoldThemeMap />
                    <div className='xs:mt-16 md:mt-0'>
                        <form onSubmit={onSave}>
                            <div className='grid xs:grid-cols-1 md:grid-cols-2 xs:gap-6 md:gap-16'>
                                <input onChange={(e: any) => {
                                    setFieldValue({
                                        name: e.target.value
                                    })
                                }} value={objUser.name} required type="text" className='border border-black border-solid p-6 text-[1.5rem] font-medium' placeholder='Your Name' />
                                <input onChange={(e: any) => {
                                    setFieldValue({
                                        email: e.target.value
                                    })
                                }} value={objUser.email} required type="email" className='border border-black border-solid p-6 text-[1.5rem] font-medium' placeholder='Email Address' />
                            </div>
                            <div className='grid xs:grid-cols-1  mt-8 xs:gap-6 md:gap-16'>
                                <input onChange={(e: any) => {
                                    const userInput = e.target.value;
                                    if (userInput.length <= 10) {
                                        setFieldValue({
                                            mobile: userInput,
                                        });
                                    }
                                }} required value={objUser.mobile || ""} type="number" className='border border-black border-solid p-6 text-[1.5rem] font-medium' placeholder='Mobile Number' />
                            </div>
                            <div className='grid grid-cols-1 mt-8'>
                                <textarea onChange={(e: any) => {
                                    setFieldValue({
                                        message: e.target.value
                                    })
                                }} value={objUser.message} rows={15} className='border border-black border-solid p-6 text-[1.5rem] font-medium' placeholder='Write your message here...' />
                            </div>
                            <div className='pt-8 md:float-right xs:block xs:m-auto'>
                                <button type='submit' className='hover:bg-yellow-300 hover:text-gold-primary transition-all duration-300 bg-gold-primary text-white py-4 px-8 text-[1.6rem] font-medium'>Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="iconPacks my-8 mt-32 flex items-center justify-center">
                    <GoldFollowUs />
                </div>
            </div>
        </section>
    )
}

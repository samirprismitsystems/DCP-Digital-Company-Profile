import { ThemeContextApi } from '@/pages/[slug]';
import ApiService from '@/services/ApiServices';
import Utils from '@/services/Utils';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import Map from '../Map/Map';
import ContactCard from './ContactCard/ContactCard';

interface IContactUsProps {
    child?: any
    placeHolderColor?: string
    submitButtonStyle?: string
    removeCardsBorder?: boolean
}

export default function ContactUs(props: IContactUsProps) {
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
        <section id='contact' className='py-24 bg-gold-white relative text-center block'>
            <div className="container">
                <div className='flex xs:flex-wrap gap-y-6 lg:flex-nowrap'>
                    <ContactCard isRemoveBorder={props.removeCardsBorder} isMobile={isMobile} title='Contact Number' value={`+91 ${objItem.company_contact}`} iconName={faPhone} />
                    <ContactCard href={`mailto:${objItem.company_email}`} isRemoveBorder={props.removeCardsBorder} isMobile={isMobile} title='Email Address' value={objItem.company_email} iconName={faEnvelope} />
                    <ContactCard href={`http://maps.google.com/maps/search/?api=1&query=${objItem.address}`} isRemoveBorder={props.removeCardsBorder} isTablet={isTablet} isMobile={isMobile} title='Address' value={objItem.address} iconName={faMapMarkerAlt} />
                </div>
                {!props.child && (
                    <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-8 pt-24">
                        <Map />
                        <div className='xs:mt-16 md:mt-0'>
                            <form onSubmit={onSave}>
                                <div className='grid xs:grid-cols-1 md:grid-cols-2 xs:gap-6 md:gap-16'>
                                    <input onChange={(e: any) => {
                                        setFieldValue({
                                            name: e.target.value
                                        })
                                    }} value={objUser.name} required type="text" className={` border border-black border-solid p-6 text-[1.5rem] font-medium ${props.placeHolderColor && props.placeHolderColor}`} placeholder='Your Name' />
                                    <input onChange={(e: any) => {
                                        setFieldValue({
                                            email: e.target.value
                                        })
                                    }} value={objUser.email} required type="email" className={`border border-black border-solid p-6 text-[1.5rem] font-medium ${props.placeHolderColor && props.placeHolderColor}`} placeholder='Email Address' />
                                </div>
                                <div className='grid xs:grid-cols-1  mt-8 xs:gap-6 md:gap-16'>
                                    <input onChange={(e: any) => {
                                        const userInput = e.target.value;
                                        if (userInput.length <= 10) {
                                            setFieldValue({
                                                mobile: userInput,
                                            });
                                        }
                                    }} required value={objUser.mobile || ""} type="number" className={`border border-black border-solid p-6 text-[1.5rem] font-medium ${props.placeHolderColor && props.placeHolderColor} border border-black border-solid p-6 text-[1.5rem] font-medium`} placeholder='Mobile Number' />
                                </div>
                                <div className='grid grid-cols-1 mt-8'>
                                    <textarea onChange={(e: any) => {
                                        setFieldValue({
                                            message: e.target.value
                                        })
                                    }} value={objUser.message} rows={15} className={`border border-black border-solid p-6 text-[1.5rem] font-medium ${props.placeHolderColor && props.placeHolderColor} border border-black border-solid p-6 text-[1.5rem] font-medium`} placeholder='Write your message here...' />
                                </div>
                                <div className='w-full flex xs:justify-center xs:items-center lg:items-end lg:justify-start mt-4'>
                                    <button type='submit' className={`${props.submitButtonStyle ? props.submitButtonStyle : "bg-gold-primary text-white hover:bg-yellow-300 hover:text-gold-primary"} transition-all duration-300  py-4 text-[1.6rem] font-medium px-8`}>Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {props.child && props.child}
            </div>
        </section>
    )
}

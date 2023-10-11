import { ThemeContextApi } from '@/pages/[slug]';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useContext } from 'react';
import GoldThemeMap from '../GoldThemeMap/GoldThemeMap';
import GoldContactCard from './ContactCard/GoldContactCard';

export default function GoldContactUs() {
    const objItem = useContext(ThemeContextApi).company;

    if (!objItem) return null;
    return (
        <section className='py-24 bg-white relative text-center block'>
            <div className="container">
                <div className='grid grid-cols-3 gap-8'>
                    <GoldContactCard title='Address' value={objItem.address} iconName={faMapMarkerAlt} />
                    <GoldContactCard title='Contact Number' value={`+91 ${objItem.company_contact}`} iconName={faPhone} />
                    <GoldContactCard title='Email Address' value={objItem.company_email} iconName={faEnvelope} />
                </div>
                <div className="grid grid-cols-2 gap-8 pt-24">
                    <GoldThemeMap />
                    <div>
                        <form>
                            <div className='grid grid-cols-2 gap-16'>
                                <input type="text" className='border border-black border-solid p-6 text-[1.5rem] font-medium' placeholder='Your Name' />
                                <input type="text" className='border border-black border-solid p-6 text-[1.5rem] font-medium' placeholder='Email Address' />
                            </div>
                            <div className='grid grid-cols-1 mt-8'>
                                <textarea rows={15} className='border border-black border-solid p-6 text-[1.5rem] font-medium' placeholder='Write your message here...' />
                            </div>
                            <div className='pt-8 float-right'>
                                <button className='hover:bg-yellow-300 hover:text-gold-primary transition-all duration-300 bg-gold-primary text-white py-4 px-8 text-[1.6rem] font-medium'>Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="iconPacks">
                    <Link href={"#"} className='bg-gold-primary pt-[2rem] p-[1.5rem] text-white'>
                        <FontAwesomeIcon className='text-[1.8rem]' icon={faFacebook} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

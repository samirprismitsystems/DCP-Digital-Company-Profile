import styles from './styles/hero.module.scss';
import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { UPLOAD_IMAGE_URI } from '@/services/config';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';

export default function Hero() {
    const objItem = useContext(ThemeContextApi).company;

    return (
        <section id='home' className='Hero h-auto bg-gold-white pt-[100px] pb-[20px]'>
            <div className="container  md:mt-[5rem]">
                <div className='grid xs:grid-cols-1 md:grid-cols-2 md:gap-8 justify-between items-center'>
                    <div className='firstColumn xs:text-center md:text-left'>
                        <div className='xs:my-auto xs:block sm:mb-8'>
                            <img className='xs:m-auto md:m-0' src={`${UPLOAD_IMAGE_URI}/${objItem.company_id || Utils.getCompanyID()}/logo/${objItem.company_logo}`} alt="company_logo.png" />
                        </div>
                        <h1>{Utils.getContent(objItem?.company_name)}</h1>
                        <h2 className='font-normal'>{Utils.getContent(objItem?.business_segment)}</h2>
                    </div>
                    <div className='secondColumn xs:xs:mt-20'>
                        <div className='xs:my-auto xs:block sm:mb-8'>
                            <img className='xs:m-auto md:m-0 md:float-right' src={`${UPLOAD_IMAGE_URI}/${objItem.company_id || Utils.getCompanyID()}/banner/${objItem.company_banner}`} alt="hero_side_image.avif" />
                        </div>
                    </div>
                </div>
                <div className='xs:mt-20 md:mt-[150] text-center'>
                    <div className='inline-block px-4 cursor-pointer' onClick={() => {
                        Utils.scrollToView('about')
                    }}>
                        <h4 className='uppercase tracking-wide'>See More</h4>
                        <FontAwesomeIcon className={`${styles.seeMoreButtonEffect} p-4 w-14 h-14 rounded-50`} icon={faChevronDown} />
                    </div>
                </div>
            </div>
        </section>
    )
}

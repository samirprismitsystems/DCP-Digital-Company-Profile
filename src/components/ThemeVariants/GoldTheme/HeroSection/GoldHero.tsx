import { ThemeContextApi } from '@/pages/[slug]';
import Utils from '@/services/Utils';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';

export default function GoldHero() {
    const objItem = useContext(ThemeContextApi).company;

    return (
        <section className='goldHero h-auto bg-white pt-[100px] pb-[20px]'>
            <div className="container">
                <div className='grid xs:grid-cols-1 md:grid-cols-2 md:gap-8 justify-between items-center'>
                    <div className='firstColumn xs:text-center md:text-left'>
                        <div className='xs:my-auto xs:block sm:mb-8'>
                            <img className='xs:m-auto md:m-0' src={'/gold_theme/company_logo.png'} alt="company_logo.png" />
                        </div>
                        <h1>{Utils.getContent(objItem?.company_name)}</h1>
                        <h2 className='font-normal'>{Utils.getContent(objItem?.business_segment)}</h2>
                    </div>
                    <div className='secondColumn xs:xs:mt-20'>
                        <div className='xs:my-auto xs:block sm:mb-8'>
                            <img className='xs:m-auto md:m-0 md:float-right' src={'/gold_theme/hero_side_image.avif'} alt="hero_side_image.avif" />
                        </div>
                    </div>
                </div>
                <div className='xs:mt-20 md:mt-[150] lg:mt-[200px] text-center'>
                    <div className='inline-block px-4 cursor-pointer' onClick={() => {
                        Utils.scrollToView('aboutUs')
                    }}>
                        <h4 className='uppercase tracking-wide'>See More</h4>
                        <FontAwesomeIcon className='seeMoreButtonEffect p-4 w-14 h-14 rounded-50' icon={faChevronDown} />
                    </div>
                </div>
            </div>
        </section>
    )
}

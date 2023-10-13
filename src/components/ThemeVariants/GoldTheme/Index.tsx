import { ThemeContextApi } from '@/pages/[slug]';
import { useContext } from 'react';
import GoldAboutUs from './GoldAboutUs/GoldAboutUs';
import GoldContactUs from './GoldContactUs/GoldContactUs';
import GoldGallery from './GoldGallery/GoldGallery';
import GoldProduct from './GoldProduct/GoldProduct';
import GoldShareCards from './GoldShareCards/GoldShareCards';
import GoldHero from './HeroSection/GoldHero';
import GoldReview from './GoldReview/GoldReview';

export default function GoldTheme() {
    const objItem = useContext(ThemeContextApi);

    return (
        <section className='goldTheme'>
            <GoldHero />
            <GoldAboutUs />
            <GoldShareCards />
            <GoldGallery />
            <GoldProduct />
            {/* <GoldReview/> */}
            <GoldContactUs />
        </section>
    );
}

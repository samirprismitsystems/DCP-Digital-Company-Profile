import { ThemeContextApi } from '@/pages/[slug]';
import { useContext } from 'react';
import GoldAboutUs from './GoldAboutUs/GoldAboutUs';
import GoldContactUs from './GoldContactUs/GoldContactUs';
import GoldGallery from './GoldGallery/GoldGallery';
import GoldProduct from './GoldProduct/GoldProduct';
import GoldReview from './GoldReview/GoldReview';
import GoldService from './GoldService/GoldService';
import GoldShareCards from './GoldShareCards/GoldShareCards';
import GoldHero from './HeroSection/GoldHero';

export default function GoldTheme() {
    const objItem = useContext(ThemeContextApi);

    return (
        <section className='goldTheme'>
            <GoldHero />
            <GoldAboutUs />
            <GoldShareCards />
            <GoldGallery />
            <GoldService />
            <GoldProduct />
            <GoldReview />
            <GoldContactUs />
        </section>
    );
}

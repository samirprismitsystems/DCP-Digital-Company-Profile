import { ThemeContextApi } from '@/pages/[slug]';
import { useContext } from 'react';
import GoldAboutUs from './GoldAboutUs/GoldAboutUs';
import GoldContactUs from './GoldContactUs/GoldContactUs';
import GoldProduct from './GoldProduct/GoldProduct';
import GoldShareCards from './GoldShareCards/GoldShareCards';
import GoldHero from './HeroSection/GoldHero';

export default function GoldTheme() {
    const objItem = useContext(ThemeContextApi);

    return (
        <section className='goldTheme'>
            <GoldHero />
            <GoldAboutUs />
            <GoldShareCards />
            <GoldProduct />
            <GoldContactUs />
        </section>
    );
}

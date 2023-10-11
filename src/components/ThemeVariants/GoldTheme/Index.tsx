import { ThemeContextApi } from '@/pages/[slug]';
import { useContext } from 'react';
import GoldAboutUs from './GoldAboutUs/GoldAboutUs';
import GoldShareCards from './GoldShareCards/GoldShareCards';
import GoldHero from './HeroSection/GoldHero';
import GoldGallery from './GoldGallery/GoldGallery';
import GoldContactUs from './GoldContactUs/GoldContactUs';

export default function GoldTheme() {
    const objItem = useContext(ThemeContextApi);0
    console.log(objItem)

    return (
        <>
            <GoldHero />
            <GoldAboutUs />
            <GoldShareCards />
            {/* <GoldGallery/>         */}
            <GoldContactUs/>
        </>
    );
}

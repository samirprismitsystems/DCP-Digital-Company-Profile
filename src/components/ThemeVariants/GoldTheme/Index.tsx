import GoldAboutUs from './GoldAboutUs/GoldAboutUs';
import GoldContactUs from './GoldContactUs/GoldContactUs';
import GoldFooter from './GoldFooter/GoldFooter';
import GoldGallery from './GoldGallery/GoldGallery';
import GoldProduct from './GoldProduct/GoldProduct';
import GoldReview from './GoldReview/GoldReview';
import GoldService from './GoldService/GoldService';
import GoldShareCards from './GoldShareCards/GoldShareCards';
import GoldHero from './HeroSection/GoldHero';

export default function GoldTheme() {

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
            <GoldFooter />
        </section>
    );
}

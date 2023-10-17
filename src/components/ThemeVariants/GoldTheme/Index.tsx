import AboutUs from './AboutUs/AboutUs';
import AppBar from './Appbar/AppBar';
import ContactUs from './ContactUs/ContactUs';
import Footer from './Footer/Footer';
import Gallery from './Gallery/Gallery';
import Hero from './HeroSection/Hero';
import Product from './Product/Product';
import Review from './Review/Review';
import Service from './Service/Service';
import ShareCards from './ShareCards/ShareCards';

export default function Index() {

    return (
        <section className="goldTheme">
            <AppBar/>
            <Hero />
            <AboutUs />
            <ShareCards />
            <Product />
            <Service />
            <Gallery />
            <Review />
            <ContactUs />
            <Footer />
        </section>
    );
}

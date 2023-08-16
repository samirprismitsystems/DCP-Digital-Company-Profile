import Head from "next/head";
import HomeCareAboutUs from "./AboutUs/HomeCareAboutUs";
import HomeCareContactIcons from "./ContactInformation/HomeCareContactIcons";
import HomeCareContactInformation from "./ContactInformation/HomeCareContactInformation";
import HomeCareShareCard from "./ContactInformation/HomeCareShareCard";
import HomeCareEnquiryForm from "./EnquiryFom/HomeCareEnquiryForm";
import HomeCareFooter from "./Footer/HomeCareFooter";
import HomeCareGallery from "./Gallery/HomeCareGallery";
import HomeCareGoogleMap from "./GoogleMap/HomeCareGoogleMap";
import HomeCareHeroSection from "./HeroSection/HomeCareHeroSection";
import HomeCareSaveContact from "./HomeCareSaveContact/HomeCareSaveContact";
import HomeCareMadeWithLove from "./MadeWithLove/HomeCareMadeWithLove";
import HomeCarePaymentDetails from "./Payments/HomeCarePaymentDetails";
import HomeCareProducts from "./Products/HomeCareProducts";
import HomeCareServices from "./Services/HomeCareServices";
import HomeCareVideos from "./Videos/HomeCareVideos";

export default function HomeCarePage() {
  return (
    <>
      <Head>
        <title>Home Care Products</title>
      </Head>
      <div className="homeCareBody pl-0 pr-0 pb-0 w-full bg-homeCareTheme-primary">
        <div className="main-container pt-[30vh] max-w-full xs:w-[500px] md:w-[62%] rounded-tl-3xl rounded-tr-3xl rounded-bl-none rounded-br-none m-auto relative py-0 px-7">
          <HomeCareHeroSection />
          <HomeCareContactIcons />
          <HomeCareContactInformation />
          <HomeCareShareCard />
          <HomeCareSaveContact />
          <HomeCareAboutUs />
          <HomeCareProducts />
          <HomeCareGallery />
          <HomeCareServices />
          <HomeCareVideos />
          <HomeCarePaymentDetails />
          <HomeCareGoogleMap />
          <HomeCareEnquiryForm />
          <HomeCareMadeWithLove />
          <HomeCareFooter />
        </div>
      </div>
    </>
  );
}

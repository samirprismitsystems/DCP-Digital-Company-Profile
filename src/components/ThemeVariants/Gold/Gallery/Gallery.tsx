import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import dynamic from "next/dynamic";
import { useCallback, useContext, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import GalleryCard from "./Cards/GalleryCard";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

export default function Gallery() {
    const lstPortfolio = useContext(ThemeContextApi).portfolio;
    const [slidesToShow, setSlidesToShow] = useState<number>(1);
    const objItem = useContext(ThemeContextApi).portfolio[0];
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [images, setImages] = useState([]);


    const openImageViewer = useCallback((index: number) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const loadData = () => {
        if (lstPortfolio) {
            let result: any = [];

            lstPortfolio.forEach((item) => {
                if (item.portfolio_image) {
                    result.push(`${UPLOAD_IMAGE_URI}/${item.company_id}/portfolio/${item.portfolio_image}`)
                }
            })
            setImages(result)
        }
    };

    useEffect(() => {
        loadData();
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 620) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 950) {
                setSlidesToShow(2);
            } else if (window.innerWidth < 2000) {
                setSlidesToShow(3);
            } else {
                setSlidesToShow(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const options = {
        loop: true,
        items: slidesToShow,
        autoplay: false,
        dots: true,
        nav: false,
        autoplayTimeout: 3000,
        smartSpeed: 1100,
    };


    if (!images) return null;
    return (
        <section id='gallery' className='py-24  bg-gold-white'>
            <div className="container">
                <h2 className="uppercase text-center text-gold-primary my-16">Gallery</h2>
                <div className="xs:hidden md:grid py-4 grid xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center items-center">
                    {images.map((item, index) => (
                        <GalleryCard
                            key={index}
                            srcPath={item}
                            onClick={() => openImageViewer(index)}
                            companyID={objItem.company_id} />
                    )
                    )}
                    {isViewerOpen && (
                        <ImageViewer
                            src={images}
                            currentIndex={currentImage}
                            onClose={closeImageViewer}
                            disableScroll={false}
                            closeOnClickOutside={true}
                        />
                    )}
                </div>

                <div className="xs:block md:hidden">
                    {lstPortfolio && lstPortfolio.length > 0 && (
                        <OwlCarousel className="owl-carousel owl-theme" {...options}>
                            {lstPortfolio.map((item, index) => (
                                <div key={index} className="px-8 group hover:cursor-pointer item mr-auto mb-6 min-h-[280px] max-h-[280px] h-full relative">
                                    <img
                                        alt="logo.png"
                                        title="gallery-img"
                                        id="upload-image"
                                        className="w-full min-h-[280px] max-h-[280px] h-full object-cover object-center align-middle group-hover:grayscale-0 grayscale"
                                        src={`${UPLOAD_IMAGE_URI}/${item.company_id || Utils.getCompanyID()
                                            }/portfolio/${item.portfolio_image}`}
                                    />
                                </div>
                            ))}
                        </OwlCarousel>
                    )}
                </div>
            </div>


        </section>
    )
}

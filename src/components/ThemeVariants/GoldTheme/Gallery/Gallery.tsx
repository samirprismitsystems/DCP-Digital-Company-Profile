import { ThemeContextApi } from "@/pages/[slug]";
import { UPLOAD_IMAGE_URI } from "@/services/config";
import { useCallback, useContext, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import GalleryCard from "./Cards/GalleryCard";


export default function Gallery() {
    const lstPortfolio = useContext(ThemeContextApi).portfolio;
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


    if (!images) return null;
    return (
        <section id='shareCards' className='py-24 bg-white'>
            <div className="container">
                <h2 className="uppercase text-center text-gold-primary my-16">Gallery</h2>
                <div className="py-4 grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-8">
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
            </div>


        </section>
    )
}

import GoldGalleryCard from "./Cards/GoldGalleryCard";

export default function GoldGallery() {
    return (
        <section className='py-24'>
            <div className="container">
               <div className="grid grid-cols-3 gap-8">
                    <GoldGalleryCard />
                    <GoldGalleryCard />
                    <GoldGalleryCard />
               </div>
            </div>
        </section>
    )
}

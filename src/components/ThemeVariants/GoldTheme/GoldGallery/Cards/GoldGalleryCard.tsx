
export default function GoldGalleryCard() {
    return (
        <>
            <div className="effect item group cursor-pointer mb-6">
                <div className="img mb-5">
                    <img
                        alt="gallery-img"
                        title="gallery-img"
                        id="upload-image"
                        className="w-full h-full block  object-cover align-middle group-hover:grayscale-0 grayscale"
                        src={`/gold_theme/blog1.jpg`}
                    />
                </div>
            </div>
        </>
    )
}

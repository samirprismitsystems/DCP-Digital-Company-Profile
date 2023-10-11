
export default function GoldGalleryCard() {
    return (
        <>
            <div className="item group cursor-pointer xs:w-full h-[400px] xlOne:w-[400px] mr-auto mb-6">
                <div className="effectBox xs:min-h-full h-full xlOne:min-h-[3.4rem] mb-5 p-4">
                    <img
                        alt="gallery-img"
                        title="gallery-img"
                        id="upload-image"
                        className="samir  w-full max-w-full h-full block object-contain object-center align-middle group-hover:grayscale-0 grayscale"
                        src={`/gold_theme/hero_side_image.avif`}
                    />
                </div>
            </div>
        </>
    )
}

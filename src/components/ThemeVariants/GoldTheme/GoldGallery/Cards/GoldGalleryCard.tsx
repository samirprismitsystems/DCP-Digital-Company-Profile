import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";

interface IGoldGalleryCardProps {
    companyID: string;
    srcPath: string
    onClick?: () => void;
}
export default function GoldGalleryCard(props: IGoldGalleryCardProps) {
    return (
        <>
            <div onClick={() => {
                if (props.onClick) {
                    props.onClick();
                }
            }} className="galleryCard px-8 group hover:cursor-pointer item xs:w-full h-full xlOne:w-[400px] mr-auto mb-6">
                <div className="xs:min-h-full h-full xlOne:min-h-[3.4rem] mb-5 px-2  py-0 ">
                    <img
                        alt="logo.png"
                        title="gallery-img"
                        id="upload-image"
                        className="w-full max-w-full h-full block object-cover object-center align-middle group-hover:grayscale-0 grayscale"
                        src={`${props.srcPath}`}
                    />
                </div>
            </div>
        </>
    )
}

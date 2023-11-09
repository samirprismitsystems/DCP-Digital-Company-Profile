import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";

interface IGalleryCardProps {
    companyID: string;
    srcPath: string
    onClick?: () => void;
}
export default function GalleryCard(props: IGalleryCardProps) {
    return (
        <>
            <div onClick={() => {
                if (props.onClick) {
                    props.onClick();
                }
            }} className="galleryCard group hover:cursor-pointer item xs:w-full h-full xlOne:w-[400px] mr-auto mb-6">
                <div className="xs:min-h-full h-full md:min-h-[250px] lg:min-h-[450px] mb-5 py-0 ">
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

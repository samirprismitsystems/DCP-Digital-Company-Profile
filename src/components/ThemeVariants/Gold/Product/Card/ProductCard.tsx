import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";

interface IProductCardProps {
    companyID: string;
    srcPath: string;
    title: string;
    desc: string;
    price: string;
}

export default function ProductCard(props: IProductCardProps) {

    return (
        <div>
            <div className="px-8 group hover:cursor-pointer item xs:w-full h-full xlOne:w-[400px] mr-auto mb-6">
                <div className="xs:min-h-full h-[300px] xlOne:min-h-[3.4rem] mb-5 px-2  py-0 ">
                    <img
                        alt="logo.png"
                        title="gallery-img"
                        id="upload-image"
                        className="w-full max-w-full h-full block object-cover object-center transition-all duration-700 ease-in align-middle group-hover:grayscale-0 grayscale"
                        src={`${UPLOAD_IMAGE_URI}/${props.companyID || Utils.getCompanyID()
                            }/product/${props.srcPath}`}
                    />
                </div>
                <h3 className="pt-4 text-center after:border-b-[2px] after:border-b-[#CCCCCC] after:border-solid after:block after:w-[65px] after:my-4 after:mx-auto">{Utils.getContent(props.title)}</h3>
                <div className="py-4 text-center">
                    <span className="text-[1.8rem]">{Utils.getContent(props.desc)}</span>
                </div>
                <h2 className="px-2 py-2 font-bold text-[1.8rem] text-center">Rs.{Utils.getContent(props.price)}</h2>
            </div>
        </div>
    )
}

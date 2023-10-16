import Utils from "@/services/Utils";
import { UPLOAD_IMAGE_URI } from "@/services/config";

interface IGoldProductCardProps {
    image: string;
    title: string;
    desc: string;
    isLeft: boolean;
    companyID: number;
    price: number;
}

export default function GoldProductCard(props: IGoldProductCardProps) {
    return (
        <div className="grid xs:grid-cols-1 lg:grid-cols-2">
            {props.isLeft && (
                <div className="h-full relative">
                    <img className="h-full w-full object-fill object-center" src={`${UPLOAD_IMAGE_URI}/${props.companyID || Utils.getCompanyID()}/product/${props.image}`} alt="product.png" />
                </div>
            )}
            <div className={`p-8 ${props.isLeft ? "bg-gold-primary" : "bg-white"}`}>
                <h5 className={`mb-4 relative text-left uppercase ${props.isLeft ? "text-white" : "text-gadgetTheme-text"} after:border-b-[2px] ${props.isLeft ? "after:border-b-white" : "after:border-b-black"} after:border-solid after:block after:w-[65px] after:mt-2 after:mb-8`}>{Utils.getContent(props.title)}</h5>
                <div className="mb-8">
                    <span className={`${props.isLeft ? "text-white" : "text-gadgetTheme-text"} text-[1.8rem]`}>
                        {Utils.getContent(props.desc)}
                    </span>
                </div>
                <div className="mb-8">
                    <span className={`${props.isLeft ? "text-white" : "text-gadgetTheme-text"} font-semibold text-[1.8rem]`}>{`Rs. ${Utils.getContent(props.price)}`}</span>
                </div>
                <button type="button" className={`${props.isLeft ? "text-white  hover:bg-white hover:text-gold-primary border-white" : "text-gadgetTheme-text hover:text-black border-gadgetTheme-text hover:border-black"} bg-transparent  border  text-[1.8rem] font-semibold py-6 px-14 transition-all duration-700`}>
                    Buy Now
                </button>
            </div>
            {!props.isLeft && (
                <div className="h-full relative">
                    <img className="h-full w-full object-fill object-center" src={`${UPLOAD_IMAGE_URI}/${props.companyID || Utils.getCompanyID()}/product/${props.image}`} alt="product.png" />
                </div>
            )}
        </div>
    )
}

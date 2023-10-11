import Utils from "@/services/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

interface IGoldCardsProps {
    title: string;
    iconName: any;
    value?: string;
    clickHandler?: () => void;
    link?: string;
    openInParent?: boolean;
    content?: any;
}

export default function GoldCards(props: IGoldCardsProps) {
    const router = useRouter();

    return (
        <div onClick={() => {
            if (props.clickHandler) {
                props.clickHandler();
            } else {
                if (props.link) {
                    if (props.openInParent) {
                        router.push(props.link)
                    } else {
                        window.open(props.link)
                    }
                }
            }
        }} className="inline-block text-center group hover:cursor-pointer">
            <div className="icon w-[160px] h-[160px] relative my-0 mx-auto  text-center rounded-50 shadow shadow-[0 0 0 0 rgba(0,0,0,0.0)] text-gold-primary mb-8 border border-gold-primary border-solid flex justify-center items-center text-[4rem] group-hover:bg-gold-primary transition-all duration-[500ms] group-hover:transition-all group-hover:duration-[500ms]">
                <FontAwesomeIcon className="p-4 group-hover:text-white group-hover:text-[6rem] group-hover:transition-all group-hover:duration-[500ms] transition-all duration-[500ms]" icon={props.iconName} />
            </div>
            <h3 className="inline tracking-wide leading-relaxed  hover:cursor-pointer after:border-b-[2px] after:border-b-[#CCCCCC] after:border-solid after:block after:w-[65px] after:my-4 after:mx-auto">{Utils.getContent(props.title)}</h3>
            {props.value && (
                <div className="text-center text-[1.8rem]">
                    <span>{Utils.getContent(props.value)}</span>
                </div>
            )}
            {props.content && (
                <div className="text-center text-[1.8rem]">
                    {props.content}
                </div>

            )}
        </div>
    )
}

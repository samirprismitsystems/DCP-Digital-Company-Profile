import Utils from "@/services/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";


interface IShareCardsProps {
    title: string;
    iconName: any;
    value?: string;
    clickHandler?: () => void;
    link?: string;
    openInParent?: boolean;
    content?: any;
}


export default function ShareCards(props: IShareCardsProps) {
    const router = useRouter();

    return (
        <>
            <div
                onClick={() => {
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
                }}
                className="group hover:cursor-pointer hover:border-b hover:border-b-gray-200 xs:p-4 xs:h-[100px] xl:h-[200px] lg:p-8 flex flex-col items-center justify-center text-left xl:flex-row"
            >
                <div>
                    <FontAwesomeIcon className="mx-2 h-16 w-auto text-bronze-title group-hover:text-bronze-primary transition-all duration-100 ease-linear" icon={props.iconName} />
                </div>
                <div className="pt-5 md:pl-5 md:pt-0">
                    <h1 className="font-body text-center lg:text-left font-semibold text-[2rem] text-bronze-primary">
                        {Utils.getContent(props.title)}
                    </h1>
                    {props.value && (
                        <h4
                            className="text-grey-dark text-center lg:text-left font-header text-[1.8rem] font-medium"
                        >
                            {Utils.getContent(props.value)}
                        </h4>
                    )}
                    {props.content && (
                        <div className="text-left text-[2rem] font-medium">
                            {props.content}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

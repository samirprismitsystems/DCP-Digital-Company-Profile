import Utils from "@/services/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styles from "./styles/shareCards.module.scss";

interface IShareCardsProps {
    title: string;
    iconName: any;
    value?: string;
    clickHandler?: () => void;
    link?: string;
    openInParent?: boolean;
    content?: any;
}

export default function ShareCard(props: IShareCardsProps) {
    const router = useRouter();

    return (
        <>
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
            }} className="w-full hover:cursor-pointer">
                <div className={`${styles.single_services} text-center mt-platinum8 mx-platinum3`}>
                    <div className={`${styles.services_icon} flex items-center justify-center`}>
                        <FontAwesomeIcon icon={props.iconName} className={`${styles.services_shape}`} />
                    </div>
                    <div className="services_content mt-platinum5 platinumXl:mt-platinum10">
                        <h3 className="services_title text-black font-semibold text-3xl platinumMd:text-2xl platinumXl:text-3xl">{Utils.getContent(props.title)}</h3>
                        {props.value && (
                            <p className="mt-platinum4">{Utils.getContent(props.value)}</p>
                        )}
                        {props.content && props.content}
                    </div>
                </div>
            </div>
        </>
    )
}

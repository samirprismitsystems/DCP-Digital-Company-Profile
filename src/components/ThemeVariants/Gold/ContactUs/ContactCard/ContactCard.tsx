import Utils from "@/services/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from './styles/contactCard.module.scss';

interface IContactCardProps {
    title: string;
    iconName: any;
    value: string
    isTablet?: boolean;
    isMobile?: boolean;
    isRemoveBorder?: boolean;
    href?: string;
}

export default function ContactCard(props: IContactCardProps) {
    return (
        props.href ? (
            <Link target="_blank" href={props.href} className={`cardShadowEffect ${props.isTablet ? "w-full" : props.isMobile ? "w-full" : "w-1/2"} px-6`}>
                <div className={`hover:cursor-pointer bg-gold-info h-full px-0 py-[30px] cardShadowBorder transition-all duration-300 ease-in w-full ${!props.isRemoveBorder && styles.cardShadow}`}>
                    <div className='mb-4  flex justify-center items-center flex-col space-y-4 after:border-b-[2px] after:border-b-[#CCCCCC] after:border-solid after:block after:w-[65px] after:my-4 after:mx-auto'>
                        <FontAwesomeIcon className='text-[2rem]' icon={props.iconName} />
                        <h4 className='uppercase font-semibold'>{Utils.getContent(props.title)}</h4>
                    </div>
                    <span className='text-[1.8rem] px-4 font-normal '>{Utils.getContent(props.value)}</span>
                </div>
            </Link>
        ) : (
            <div className={`cardShadowEffect ${props.isTablet ? "w-full" : props.isMobile ? "w-full" : "w-1/2"} px-6`}>
                <div className={`hover:cursor-pointer bg-gold-info h-full px-0 py-[30px] cardShadowBorder transition-all duration-300 ease-in w-full ${!props.isRemoveBorder && styles.cardShadow}`}>
                    <div className='mb-4  flex justify-center items-center flex-col space-y-4 after:border-b-[2px] after:border-b-[#CCCCCC] after:border-solid after:block after:w-[65px] after:my-4 after:mx-auto'>
                        <FontAwesomeIcon className='text-[2rem]' icon={props.iconName} />
                        <h4 className='uppercase font-semibold'>{Utils.getContent(props.title)}</h4>
                    </div>
                    <span className='text-[1.8rem] px-4 font-normal '>{Utils.getContent(props.value)}</span>
                </div>
            </div>
        )
    )
}

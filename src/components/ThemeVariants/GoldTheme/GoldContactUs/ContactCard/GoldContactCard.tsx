import Utils from '@/services/Utils';
import { faMap, faMapLocation, faMapMarked, faMapMarkedAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IGoldContactCardProps {
    title: string;
    iconName: any;
    value: string
}

export default function GoldContactCard(props: IGoldContactCardProps) {
    return (
        <div className='hover:cursor-pointer bg-gold-info px-0 py-[30px] gold_card_shadow'>
            <div className='mb-4 flex justify-center items-center flex-col space-y-4 after:border-b-[2px] after:border-b-[#CCCCCC] after:border-solid after:block after:w-[65px] after:my-4 after:mx-auto'>
                <FontAwesomeIcon className='text-[2rem]' icon={props.iconName} />
                <h4 className='uppercase  font-semibold'>{Utils.getContent(props.title)}</h4>
            </div>
            <span className='text-[1.8rem] font-normal '>{Utils.getContent(props.value)}</span>
        </div>
    )
}

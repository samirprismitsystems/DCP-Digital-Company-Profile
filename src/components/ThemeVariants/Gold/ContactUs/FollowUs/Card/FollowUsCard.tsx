import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';


interface IFollowUsCardProps {
    socialID: string;
    socialColor: string;
    icon: any;
}

export default function FollowUsCard(props: IFollowUsCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Link
            key={props.socialID}
            href={"#"}
            target="_blank"
            style={{
                backgroundColor: isHovered ? props.socialColor : "inherit"
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`mx-2 my-4 w-16 h-16 text-center text-white flex justify-center items-center border-b-[2px] border-b-white border-dotted group bg-gold-primary ho    ver:border-b-gold-primary goldContactLinks`}
        >
            <FontAwesomeIcon
                className="text-3xl font-bold group-hover:text-gold-primary "
                icon={props.icon}
            />
        </Link>
    )
}

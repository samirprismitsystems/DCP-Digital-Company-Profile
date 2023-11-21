import Utils from '@/services/Utils';
import { useState } from 'react';

export default function ProductDesc(props: {
    product_desc: string
}) {
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        setIsActive(!isActive);
    }

    return (
        <>
            <div className={`${isActive ? "h-full" : "h-[100px]"}`}>
                <h3 className='text-2xl leading-normal font-normal pt-6 opacity-75'>{isActive ? props.product_desc : Utils.getCompressContent(props.product_desc)}</h3>
                {Utils.getCompressContent(props.product_desc).endsWith('..') && !isActive && (
                    <div onClick={toggle} className='hover:cursor-pointer text-blue-800 text-2xl'>see more</div>
                )}
                {Utils.getCompressContent(props.product_desc).endsWith('..') && isActive && (
                    <div onClick={toggle} className='hover:cursor-pointer text-blue-800 text-2xl'>see less</div>
                )}
            </div>
        </>
    )
}

import { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useFormContext } from 'react-hook-form';
import styles from "./styles/colorPicker.module.scss";

interface IUpdateAndShowSocialColorProps {
    color: string;
    isDelete?: boolean;
    index: number
}
export default function UpdateAndShowSocialColor(props: IUpdateAndShowSocialColorProps) {
    const wrapperRef = useRef<any>(null);
    const [selectedColor, setSelectedColor] = useState(props.color.startsWith('#') ? props.color : "#000000");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const objForm = useFormContext()

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className='flex items-center justify-start'>
                <button onClick={toggle} id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" className="items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400 inline-flex" type="button">
                    <div style={{ backgroundColor: selectedColor }} className={`w-8 my-4 h-8 inline px-4 mr-4 ${props.isDelete && "hover:cursor-pointer"}`}></div>
                </button>

                {!isOpen && (
                    <span
                        className="w-full text-2xl focus:outline-none font-light text-primary-light placeholder:text-info-main bg-transparent border-0 font-['GothamRoundedLight']"
                    >{objForm.getValues(`adminSocialMediaInfo.${props.index}.socialmedia_color`) || "#000000"}</span>
                )}
            </div>

            {isOpen && (
                <div ref={wrapperRef} id="dropdownNotification" className="w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow absolute z-10" aria-labelledby="dropdownNotificationButton">
                    <div className="text-[1.8rem] block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
                        Update Social Color
                    </div>
                    <div className="divide-y divide-gray-100 w-full relative">
                        <HexColorPicker className={`${styles.colorPickerWidth}`} color={selectedColor} onChange={(value: any) => {
                            setSelectedColor(value)
                            objForm.setValue(`adminSocialMediaInfo.${props.index}.socialmedia_color`, (value))
                        }} />
                    </div>
                    <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 ">
                        <div className="inline-flex items-center text-[1.8rem] py-4">
                            {selectedColor}
                        </div>
                    </a>
                </div>
            )}
        </>
    )
}

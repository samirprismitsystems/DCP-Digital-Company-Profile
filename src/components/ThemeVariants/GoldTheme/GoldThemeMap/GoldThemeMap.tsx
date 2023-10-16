import { ThemeContextApi } from "@/pages/[slug]";
import { useContext } from "react";

export default function GoldThemeMap() {
    const objCompany = useContext(ThemeContextApi).company;


    if (!objCompany) return null;
    return (
        <>
            <div className="max-w-full">
                <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        objCompany.address
                    )}&z=15&output=embed`}
                    width="100%"
                    height="580"
                    frameBorder={0}
                    className="border-0"
                    allowFullScreen={true}
                    aria-hidden="false"
                    tabIndex={0}
                ></iframe>
            </div>
        </>
    );
}

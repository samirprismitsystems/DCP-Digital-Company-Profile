import { ThemeContextApi } from "@/pages/[slug]";
import { useContext } from "react";

export default function Map() {
    const objCompany = useContext(ThemeContextApi).company;


    if (!objCompany) return null;
    return (
        <>
            <div
                className="content-box gallery-box xs:min-h-[300px] md:min-h-full p-0 overflow-hidden mx-4"
            >
                <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        objCompany.address
                    )}&z=15&output=embed`}
                    width="100%"
                    frameBorder={0}
                    className="border-0 h-full"
                    allowFullScreen={true}
                    aria-hidden="false"
                    tabIndex={0}
                />
            </div>
        </>
    );
}

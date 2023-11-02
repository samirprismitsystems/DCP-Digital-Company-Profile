import { ThemeContextApi } from "@/pages/[slug]";
import Utils from "@/services/Utils";
import { faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

const ShareCards = () => {
    const objCompany = useContext(ThemeContextApi).company;

    return (
        <section className="pt-16" id="contact">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div
                            className="wow fadeInUp flex e flex-wrap items-center justify-center rounded-md bg-[#F9FAFF] py-8 px-8 dark:bg-diamond-primary dark:bg-opacity-5 diamondSm:px-10 md:py-[40px] md:px-[50px] diamondXl:p-[50px] diamond2xl:py-[60px] diamond2xl:px-[70px]"
                            data-wow-delay=".1s
              "
                        >
                            <div className="grid grid-cols-1 diamondLg:grid-cols-3 gap-4">
                                <SingleBrand iconName={faPhone} title="Contact" value={`+91 ${Utils.getContent(objCompany.company_contact)}`} />
                                <SingleBrand iconName={faEnvelope} title="Email" value={`${Utils.getContent(objCompany.company_email)}`} />
                                <SingleBrand iconName={faMapMarkerAlt} title="Address" value={`${Utils.getContent(objCompany.address)}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShareCards;

const SingleBrand = (props: {
    value: string;
    title: string;
    iconName: any;
}) => {
    const { value, title, iconName } = props;

    return (
        <div className="mx-3 flex w-full items-center justify-center bg-[#F9FAFB] shadow-md h-full min-h-[200px] relative hover:shadow-lg dark:bg-diamond-black">
            <div className="h-full text-center dark:text-white px-4 flex items-center justify-center flex-col">
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-diamond-white diamondSm:text-3xl diamondLg:text-2xl xl:text-3xl">
                    {title}
                </h2>
                <p className="text-base font-medium text-diamond-body-color">
                    {value}
                </p>
            </div>
        </div>
    );
};

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const SingleFeature = ({ icon, title, desc, content, clickHandler, link, openInParent }: any) => {
    const router = useRouter();

    return (
        <div className="w-full group hover:cursor-pointer" onClick={() => {
            if (clickHandler) {
                clickHandler();
            } else {
                if (link) {
                    if (openInParent) {
                        router.push(link)
                    } else {
                        window.open(link)
                    }
                }
            }
        }}>
            <div className="wow fadeInUp flex items-center justify-center flex-col" data-wow-delay=".15s">
                <div className="mb-4 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-diamond-primary bg-opacity-10 text-diamond-primary">
                    <FontAwesomeIcon className="group-hover:text-diamond-primary group-hover:text-[4rem] group-hover:transition-all group-hover:duration-[500ms] transition-all duration-[500ms] text-[3rem]" icon={icon} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-black dark:text-diamond-white diamondSm:text-2xl diamondLg:text-xl diamondXl:text-2xl">
                    {title}
                </h3>
                {desc && (
                    <p className="pr-[10px] text-base font-medium leading-relaxed text-diamond-body-color">
                        {desc}
                    </p>
                )}
                {content && (
                    <div className="pr-[10px] text-base font-medium leading-relaxed text-diamond-body-color">
                        {content}
                    </div>

                )}
            </div>
        </div>
    );
};

export default SingleFeature;

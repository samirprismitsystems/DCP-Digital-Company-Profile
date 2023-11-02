import Utils from "@/services/Utils";
import Image from "next/image";


interface ISingleServiceProps {
    title: string;
    image: string;
    desc: string;
}

const SingleService = (props: ISingleServiceProps) => {

    return (
        <>
            <div
                className="group hover:cursor-pointer wow fadeInUp relative overflow-hidden rounded-md bg-slate-100 shadow-one dark:bg-diamond-dark "
                data-wow-delay=".1s"
            >
                <div className="relative block h-[220px] w-full">
                    <Image src={props.image} alt="image" className="object-cover object-center" fill />
                </div>
                <div className="diamondMd:py-8 xl:py-8 px-4">
                    <h3>
                        <span
                            className="mb-4 block text-xl font-bold text-black hover:text-diamond-primary dark:text-diamond-white dark:hover:text-diamond-primary diamondSm:text-2xl"
                        >
                            {Utils.getContent(props.title)}
                        </span>
                    </h3>
                    <p className="mb-6  pb-6 text-base font-medium text-diamond-body-color">
                        {Utils.getContent(props.desc)}
                    </p>
                </div>
            </div>
        </>
    );
};

export default SingleService;

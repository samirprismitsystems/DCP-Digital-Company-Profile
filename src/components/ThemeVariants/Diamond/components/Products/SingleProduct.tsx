import Utils from "@/services/Utils";
import Image from "next/image";


interface ISingleProductProps {
    title: string;
    image: string;
    desc: string;
    price: any;
}

const SingleProduct = (props: ISingleProductProps) => {

    return (
        <>
            <div
                className="group hover:cursor-pointer wow fadeInUp relative overflow-hidden rounded-md bg-diamond-white shadow-one dark:bg-diamond-dark "
                data-wow-delay=".1s"
            >
                <div className="relative block h-[220px] w-full">
                    {/* <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize bg-white text-black  group-hover:bg-diamond-primary group-hover:text-diamond-white">
                        Buy Now
                    </span> */}
                    <Image src={props.image} className="object-cover object-center" alt="image" fill />
                </div>
                <div className="p-6 diamondSm:p-8 diamondMd:py-8 diamondMd:px-6 diamondLg:p-8 xl:py-8 xl:px-5 2xl:p-8">
                    <h3>
                        <span
                            className="mb-4 block text-xl font-bold text-black hover:text-diamond-primary dark:text-diamond-white dark:hover:text-diamond-primary diamondSm:text-2xl"
                        >
                            {Utils.getContent(props.title)}
                        </span>
                    </h3>
                    <p className="mb-6 border-b border-diamond-body-color border-opacity-10 pb-6 text-base font-medium text-diamond-body-color dark:border-white dark:border-opacity-10 overflow-y-auto max-h-[170px] min-h-[170px] h-full">
                        {Utils.getContent(props.desc)}
                    </p>
                    <div className="flex items-center">
                        <div className="inline-block">
                            <p className="text-black font-bold text-[1rem] dark:text-white">Rs.{props.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;

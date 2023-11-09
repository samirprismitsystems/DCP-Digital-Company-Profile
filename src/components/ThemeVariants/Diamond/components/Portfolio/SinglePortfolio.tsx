import Utils from "@/services/Utils";
import Image from "next/image";


interface ISinglePortfolioProps {
    image: string;
}

const SinglePortfolio = (props: ISinglePortfolioProps) => {

    return (
        <>
            <div
                className="group hover:cursor-pointer wow fadeInUp relative overflow-hidden rounded-md bg-slate-100 shadow-one dark:bg-diamond-dark"
                data-wow-delay=".1s"
            >
                <div className="relative block min-h-[300px] h-full w-full">
                    <Image src={props.image} alt="image" className="h-full object-cover object-center" fill />
                </div>
            </div>
        </>
    );
};

export default SinglePortfolio;

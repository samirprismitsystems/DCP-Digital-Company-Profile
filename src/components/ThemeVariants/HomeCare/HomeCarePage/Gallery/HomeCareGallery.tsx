import Image from "next/image";
import HomeCarePagination from "../../Common/HomeCarePagination";

export default function HomeCareGallery() {
  return (
    <>
      <div
        className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl p-5 mb-10"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <h4 className="pt-4 text-[22px] text-center text-black  font-bold mb-6 homecarefont">
          Gallery
        </h4>
        <div className="homecarefont pt-4 pb-8 px-4 grid grid-cols-2 gap-4">
          <div className="image w-full h-auto py-6">
            <Image
              alt="image.png"
              src={"/assets/homecare/homecarelogo.png"}
              width={600}
              className="max-w-[200px] block m-auto p-4 w-full h-full align-middle"
              height={600}
            />
          </div>
          <div className="image w-full h-auto py-6">
            <Image
              alt="image.png"
              src={"/assets/homecare/homecarelogo.png"}
              width={600}
              className="max-w-[200px] block m-auto p-4 w-full h-full align-middle"
              height={600}
            />
          </div>
          <div className="image w-full h-auto py-6">
            <Image
              alt="image.png"
              src={"/assets/homecare/homecarelogo.png"}
              width={600}
              className="max-w-[200px] block m-auto p-4 w-full h-full align-middle"
              height={600}
            />
          </div>
          <div className="image w-full h-auto py-6">
            <Image
              alt="image.png"
              src={"/assets/homecare/homecarelogo.png"}
              width={600}
              className="max-w-[200px] block m-auto p-4 w-full h-full align-middle"
              height={600}
            />
          </div>
          <div className="image w-full h-auto py-6">
            <Image
              alt="image.png"
              src={"/assets/homecare/homecarelogo.png"}
              width={600}
              className="max-w-[200px] block m-auto p-4 w-full h-full align-middle"
              height={600}
            />
          </div>
        </div>
        <HomeCarePagination />
      </div>
    </>
  );
}

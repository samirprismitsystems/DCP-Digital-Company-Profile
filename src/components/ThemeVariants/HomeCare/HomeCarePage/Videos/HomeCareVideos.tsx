import Image from "next/image";

export default function HomeCareVideos() {
  return (
    <>
      <div
      id="video"
        className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl p-5 mb-10 h-[550px] overflow-auto"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <h4 className="pt-4 text-[22px] text-center text-black  font-bold mb-6 homecarefont">
          Videos
        </h4>
        <div className="homecarefont pt-4 pb-8 px-4 grid xs:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="image  flex flex-wrap justify-start items-center">
            <div className="w-full h-auto">
              <Image
                alt="image.png"
                src={"/assets/homecare/homecarelogo.png"}
                width={600}
                className="max-w-[200px] block m-auto w-full h-full align-middle"
                height={600}
              />
            </div>
            <h4 className="pb-2 pt-6">Image Title-1</h4>
          </div>
          <div className="image  flex flex-wrap justify-start items-center">
            <div className="w-full h-auto">
              <Image
                alt="image.png"
                src={"/assets/homecare/homecarelogo.png"}
                width={600}
                className="max-w-[200px] block m-auto w-full h-full align-middle"
                height={600}
              />
            </div>
            <h4 className="pb-2 pt-6">Image Title-2</h4>
          </div>
          <div className="image  flex flex-wrap justify-start items-center">
            <div className="w-full h-auto">
              <Image
                alt="image.png"
                src={"/assets/homecare/homecarelogo.png"}
                width={600}
                className="max-w-[200px] block m-auto w-full h-full align-middle"
                height={600}
              />
            </div>
            <h4 className="pb-2 pt-6">Image Title-3</h4>
          </div>
          <div className="image  flex flex-wrap justify-start items-center">
            <div className="w-full h-auto">
              <Image
                alt="image.png"
                src={"/assets/homecare/homecarelogo.png"}
                width={600}
                className="max-w-[200px] block m-auto w-full h-full align-middle"
                height={600}
              />
            </div>
            <h4 className="pb-2 pt-6">Image Title-4</h4>
          </div>
          <div className="image  flex flex-wrap justify-start items-center">
            <div className="w-full h-auto">
              <Image
                alt="image.png"
                src={"/assets/homecare/homecarelogo.png"}
                width={600}
                className="max-w-[200px] block m-auto w-full h-full align-middle"
                height={600}
              />
            </div>
            <h4 className="pb-2 pt-6">Image Title-5</h4>
          </div>
        </div>
      </div>
    </>
  );
}

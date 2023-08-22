import Image from "next/image";

export default function HomeCareHeroSection() {
  return (
    <>
      <div
        className="section-1 xs:mb-[30vh] sm:mb-10 bg-white py-8 rounded-3xl border border-solid border-homeCareTheme-opacityBorder"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,128,0.2)",
        }}
      >
        <div className="w-full text-center max-w-full">
          <div className="brand-image w-72 table  ml-auto mr-auto mt-auto mb-7 text-center  justify-center items-center">
            <div className="brand-img w-auto m-auto table-cell h-32 align-middle text-center justify-center items-center">
              <div className="flex items-center justify-center">
                <Image
                  src={"/assets/homecare/homecarelogo.png"}
                  width={500}
                  height={500}
                  alt="image.png"
                  className="max-w-[150px] h-auto w-full align-middle text-center"
                />
              </div>
            </div>
          </div>

          <h5 className="head6 text-center">Home Care Products</h5>
          <h5 className="link_title font-bold homecarefont">
            Founder &amp; CEO
          </h5>
        </div>
      </div>
    </>
  );
}

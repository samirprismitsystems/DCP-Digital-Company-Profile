export default function GadgetHeroSection() {
  return (
    <section
      id="home"
      className="profile-section text-white -mb-16 bg-gadgetTheme-primary h-[50vh] sticky top-0 -z-10 gadgetfontfamily flex justify-center"
    >
      <div className="container h-full inline-flex justify-center items-center  pb-12 max-w-full w-full gadgetfontfamily">
        <div className="row profile-row min-h-[19.3rem] flex flex-wrap -mx-3 text-white gadgetfontfamily">
          <div className="col-12 text-center w-full text-white">
            <div className="store-logo rounded-50  xs:w-[90px] xs:h-[90px] bg-white flex justify-center items-center mx-auto mt-0 xs:mb-6 md:mb-8 text-center text-white gadgetfontfamily ">
              {" "}
              <img
                src="/assets/gadgetShop/logo.png"
                width="62"
                height="49"
                alt="logo"
                title="logo-img"
                className="img-responsive h-auto max-w-full align-middle md:w-[70px] md:h-[70px] xlTwo:w-auto xlTwo:h-auto"
              />{" "}
            </div>
          </div>
          <div className="col-12 text-center w-full max-w-full">
            <h1 className="store-name gadgetfontfamily xs:text-[3.8rem] md:text-[3.5rem] font-semibold text-white xs:mb-2 md:mb-4 lg:mb-2 xlTwo:text-[3rem]">
              Gadget Shop
            </h1>
            <h4 className="store-tagline font-medium xs:text-[2.5rem] md:text-[2.8rem] xlTwo:text-[2rem] text-white">
              “For Your Easy Life”
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}

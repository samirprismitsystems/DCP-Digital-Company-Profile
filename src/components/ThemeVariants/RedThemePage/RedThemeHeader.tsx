import PageCircularLoading from "@/common/PageCircularLoading";

export default function RedThemeHeader({ objCompany }: { objCompany: any }) {
  if (!objCompany) return <PageCircularLoading />;
  
  return (
    <section
      className="profile_section text-white relative h-[40vh]"
      style={{
        borderRadius: "0 0 300px 300px",
        backgroundImage:
          "-webkit-linear-gradient( 90deg, rgb(141,28,154) 50%, rgb(212,0,0) 150%)",
      }}
    >
      <div className="container h-full inline-flex justify-center items-center pb-12">
        <div className="row profile_row flex flex-wrap -mr-3 -ml-3">
          <div className="profile_name w-full text-center shrink-0 max-w-full">
            <h1 className="store_name text-white text-[3rem]">
              {objCompany.company_slug}
            </h1>
            <h2 className="store_tubelight text-white text-[2.2rem] font-medium">
              {objCompany.business_segment}
            </h2>
          </div>
          <div className="text-center w-full">
            <div
              className="profile_image w-60 h-60 rounded-50 bg-white flex items-center justify-center  overflow-hidden m-auto xs:top-[67%] md:top-[73%] left-0 right-0 absolute translate-y-(-20%) border-[0.8rem] border-white border-solid "
              style={{
                boxShadow: "0 0 10px rgb(191 191 191 / 50%)",
              }}
            >
              <img
                src={`http://localhost:8080/control/upload/${objCompany.company_id}/logo/${objCompany.company_logo}`}
                className="w-full h-full object-cover rounded-50 object-center"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomeCareShareCard() {
  const onSave = (event: any) => {
    event.preventDefault();
    
    console.log("share card data");
  };

  return (
    <>
      <div
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
        className="text-center contact-information mb-16 bg-white rounded-3xl p-5"
      >
        <form onSubmit={onSave} className="text-center">
          <h4 className="text-[22px] text-black font-bold  mb-6 text-center homecarefont">
            Share Your Card
          </h4>
          <div className="form-group mb-5 text-center">
            <input
              type="text"
              className="form-control-input rounded-xl p-6 text-[14px]  text-homeCareTheme-textColor w-full font-medium homecarefont whitespace-normal break-words focus:outline focus:border-[1px] focus:border-solid placeholder:text-[#757575] focus:border-homeCareTheme-primary"
              style={{
                border: "2px solid #ced4da",
              }}
              placeholder="Name"
              name="name"
              value=""
            ></input>
          </div>
          <div className="form-group mb-5 text-center">
            <input
              type="text"
              className="form-control-input rounded-xl p-6 text-[14px]  text-homeCareTheme-textColor w-full font-medium homecarefont whitespace-normal break-words focus:outline focus:border-[1px] focus:border-solid focus:border-homeCareTheme-primary placeholder:text-[#757575]"
              style={{
                border: "2px solid #ced4da",
              }}
              placeholder="Mobile"
              name="mobile"
              value=""
            ></input>
          </div>
          <div className="flex justify-center items-center py-4">
            <button
              type="submit"
              className="bg-homeCareTheme-primary text-white border-[1px] border-solid border-homeCareTheme-primary p-6 text-center text-2xl flex  justify-center items-center max-h-[40px] homecarefont rounded-2xl"
            >
              <FontAwesomeIcon
                className="inline-block  font-normal text-5xl"
                icon={faWhatsapp}
              />
              <span className="ml-4 text-3xl">Share Now</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

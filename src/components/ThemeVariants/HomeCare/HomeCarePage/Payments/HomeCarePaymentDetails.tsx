import {
  faBank,
  faHashtag,
  faMoneyCheck,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeCarePaymentInfo from "./HomeCarePaymentInfo";

export default function HomeCarePaymentDetails() {
  return (
    <>
      <div
        className="border border-solid border-homeCareTheme-opacityBorder bg-white rounded-3xl p-5 mb-10"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <h4 className="pt-4 text-[22px] text-center text-black  font-bold mb-6 homecarefont">
          Payment Details
        </h4>
        <div className="homecarefont pt-4 pb-8 px-4">
          <HomeCarePaymentInfo
            icon={faUserCircle}
            label="A/C Name"
            value={"Rakesh Solanki"}
          />
          <HomeCarePaymentInfo
            icon={faHashtag}
            label="A/C Number"
            value={"Rakesh Solanki"}
          />
          <HomeCarePaymentInfo
            icon={faBank}
            label="Bank Name"
            value={"Rakesh Solanki"}
          />
          <HomeCarePaymentInfo
            icon={faMoneyCheck}
            label="IFSC"
            value={"Rakesh Solanki"}
          />
          <HomeCarePaymentInfo
            isImage={true}
            label="Goggle Pay"
            imagPath="/assets/homecare/gpay.svg"
            value={"Rakesh Solanki"}
          />
          <HomeCarePaymentInfo
            isImage={true}
            label="Phone Pay"
            imagPath="/assets/homecare/phonepe.svg"
            value={"Rakesh Solanki"}
          />
          <HomeCarePaymentInfo
            isImage={true}
            mb={0}
            label="Paytm"
            imagPath="/assets/homecare/paytm.svg"
            value={"Rakesh Solanki"}
          />
        </div>
      </div>
    </>
  );
}

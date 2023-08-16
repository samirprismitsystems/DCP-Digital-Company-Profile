import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomeCareFooter() {
  return (
    <>
      <div
        className="max-w-full mx-auto  rounded-bl-none rounded-br-none sticky  bottom-0 z-[1] w-full bg-[#fff] rounded-[20px] p-5 border border-solid border-homeCareTheme-opacityBorder text-center"
        style={{
          boxShadow: "0 0px 10px 0px rgba(5,59,123,0.2)",
        }}
      >
        <a
          href="#"
          className="inline-block cursor-pointer no-underline text-center"
          style={{
            transition: "all .3s linear",
          }}
        >
          {" "}
          <FontAwesomeIcon
            className="inline-flex h-[40px] w-[40px] rounded-50  text-homeCareTheme-primary  text-2xl bg-[#e5ebf1]  text-center justify-center items-center"
            icon={faUserCircle}
          />{" "}
          <span className="link_title mt-2 text-2xl homecarefont font-normal  block text-center text-homeCareTheme-textColor  mb-0">
            Home
          </span>{" "}
        </a>
      </div>
    </>
  );
}

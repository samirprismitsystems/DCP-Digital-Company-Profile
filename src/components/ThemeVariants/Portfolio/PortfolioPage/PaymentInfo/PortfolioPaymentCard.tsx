import Image from "next/image";

export default function PortfolioPaymentCard({
  imgPath,
  Upi,
  title,
}: {
  imgPath: string;
  title: string;
  Upi: string;
}) {
  return (
    <div
      className="pay-details flex items-center rounded-[2rem] bg-white p-10 overflow-hidden  mb-8 relative "
      style={{
        boxShadow: "0px 0px 20px 0px rgb(128 128 128 / 30%)",
      }}
    >
      <span className="app-name absolute top-6 right-6 text-base inline-block c-text">
        {title || "N/A"}
      </span>
      <div className="link-icon google-icon m-0 bg-[#f2f2f2] w-24 h-24 rounded-2xl flex justify-center mr-4 items-center c-text">
        <Image
          width={35}
          height={30}
          alt="image.png"
          title="image.png"
          className="w-[3.5rem] h-auto align-middle object-center"
          src={`/${imgPath}`}
        />
      </div>
      <div className="pay-info ml-6 c-text">
        <dl className="mb-4 mt-0 c-text ">
          <dt className="clear-both mr-2 p-0 font-semibold text-black float-left m-0  xs:text-[2rem] md:text-[1.6rem]">
            No / UPI.:
          </dt>
          <dd className="float-left m-0 p-0 xs:text-[2rem] md:text-[1.6rem] c-text">
            {Upi || "N/A"}
          </dd>
        </dl>
      </div>
    </div>
  );
}

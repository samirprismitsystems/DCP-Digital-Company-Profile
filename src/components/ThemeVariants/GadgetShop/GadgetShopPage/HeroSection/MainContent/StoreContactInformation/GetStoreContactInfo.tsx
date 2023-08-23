export default function GetStoreContactInfo({
  icon,
  title,
  bgColor,
}: {
  icon: any;
  title: string;
  bgColor: string;
}) {
  return (
    <div className="col-lg-2 col-md-4 col-3 contact-link mb-8 px-4">
      {" "}
      <a
        href="tel:9876543210"
        className="link-icon call-icon xs:w-[7rem] xs:h-[7rem] md:w-[6rem] md:h-[6rem] rounded-[2rem] flex items-center justify-center mx-2 mb-4 no-underline"
        style={{
          transition: "all .3s linear",
          backgroundColor: bgColor,
        }}
      >
        {" "}
        {icon}
      </a>
      <p className="text-center xs:text-[2rem] md:text-[1.6rem] text-gadgetTheme-text gadgetfontfamily font-medium">
        {title}
      </p>
    </div>
  );
}

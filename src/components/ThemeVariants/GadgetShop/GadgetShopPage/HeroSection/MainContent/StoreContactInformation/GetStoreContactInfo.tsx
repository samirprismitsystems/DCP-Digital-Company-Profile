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
    <div className="xs:w-[25%] sm:w-[30%] xl:w-[15%] contact-link mb-8 px-4 flex justify-center items-center flex-col xs:pb-8 sm:pb-16 lg:pb-8">
      {" "}
      <a
        href="tel:9876543210"
        className="link-icon call-icon xs:w-[7rem] xs:h-[7rem] md:w-[7.5rem] md:h-[7.5rem] xl:w-[9.5rem] xl:h-[9.5rem] rounded-[2rem] flex items-center justify-center mx-2 mb-4 no-underline xlOne:w-[7rem] xlOne:h-[7rem] xlTwo:w-[6rem] xlTwo:h-[6rem]"
        style={{
          transition: "all .3s linear",
          backgroundColor: bgColor,
        }}
      >
        {" "}
        {icon}
      </a>
      <p className="text-center xs:text-[2rem] md:text-[1.6rem] xl:text-[2.5rem] text-gadgetTheme-text gadgetfontfamily font-medium xlTwo:text-[1.6rem]">
        {title}
      </p>
    </div>
  );
}

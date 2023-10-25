import Utils from "@/services/Utils";

export default function GetHomeCareFooterButton({
  icon,
  title,
  link,
}: {
  icon: any;
  title: string;
  link: string;
}) {
  return (
    <>
      <button
        type="button"
        className="inline-block cursor-pointer no-underline text-center"
        style={{
          transition: "all .3s linear",
        }}
        onClick={(event: any) => {
          event.preventDefault();
          Utils.scrollToView(link);
        }}
      >
        <div className="inline-flex h-[40px] w-[40px] rounded-50  text-homeCareTheme-primary bg-[#e5ebf1]  text-center justify-center items-center">
          {icon}
        </div>
        <span className="mt-2 text-[14px] homecarefont font-normal  block text-center text-homeCareTheme-textColor  mb-0">
          {title || "N/A"}
        </span>{" "}
      </button>
    </>
  );
}

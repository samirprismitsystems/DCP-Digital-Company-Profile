import { ICompanyDetails } from "@/types/companyTypes";
import { format } from "date-fns";
import RedThemeHeading from "./common/RedThemeHeading";

export default function RedThemeAboutUs({
  objCompany,
}: {
  objCompany: ICompanyDetails;
}) {
  if (!objCompany) return null;
  return (
    <div className="about_block ">
      <RedThemeHeading title={"About"} />
      <div className="content_col ">
        <p className="text-[2rem] text-redThemeGreyTextColor mb-4">
          <strong>
            Since {format(new Date(objCompany.established_in), "yyyy")}
          </strong>
        </p>
        <p className="text-redThemeGreyTextColor text-[2rem] mb-4">
          {objCompany.company_desc}
        </p>
      </div>
    </div>
  );
}

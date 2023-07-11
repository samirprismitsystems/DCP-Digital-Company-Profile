import { useEffect } from "react";
import Dashboard from "./DashboardCards/Dashboard";
import { loadComponents } from "next/dist/server/load-components";
import Utils from "@/services/Utils";
import ApiService from "@/services/ApiServices";
import { useAppDispatch } from "@/services/store/hooks/hooks";
import { setWebsiteSlug } from "@/services/store/slices/dashboardSlice";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const loadCompanyPageDetails = async () => {
    try {
      const res = await ApiService.getCompanyDetailsPageData();
      if (!res.error) {
        let result = res.company[0];
        if (result) {
          let websiteSlug = result.company_slug;
          dispatch(setWebsiteSlug(websiteSlug));
        }
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadCompanyPageDetails();
  }, []);

  return (
    <div className="tab_title mb-8 -mt-4">
      <div className="h2">Company Dashboard</div>
      <div className="container xlOne:max-w-full mt-12">
        <div className="row xl:grid gap-20 grid-cols-4 xs:flex flex-wrap -mr-3 -ml-3 xs:flex-col sm:flex-row justify-center">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

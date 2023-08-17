import PageCircularLoading from "@/common/PageCircularLoading";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { IAdminDashboardCounts } from "@/types/commonTypes";
import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import TopFiveCompany from "./TopFiveCompany";

export default function AdminDashboardPage() {
  const [objData, setObjData] = useState<IAdminDashboardCounts>();

  const loadData = async () => {
    try {
      const res = await ApiService.getAdminDashboardData();
      if (!res.error) {
        setObjData(res);
        return null;
      }

      throw new Error("Error occurred while getting admin dashboard data!");
    } catch (error: any) {
      Utils.showErrorMessage(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!objData) return <PageCircularLoading />;
  
  return (
    <div className="tab_title mb-8 -mt-4">
      <div className="h2">Admin Dashboard</div>
      <div className="container xlOne:max-w-full mt-12">
        <div className="row xl:grid gap-20 grid-cols-4 xs:flex flex-wrap -mr-3 -ml-3 xs:flex-col sm:flex-row justify-center">
          <AdminDashboard data={objData} />
        </div>
      </div>
      {objData && objData.company && (
        <div className="row company_table w-full font-['GothamRoundedLight']">
          <h3 className="w-full mb-12 mt-24 ">Top 5 Companies</h3>
          <TopFiveCompany lstCompany={objData.company || []} />
        </div>
      )}
    </div>
  );
}

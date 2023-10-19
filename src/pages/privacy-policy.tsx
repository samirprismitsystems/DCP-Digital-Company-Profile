import PageCircularLoading from "@/common/PageCircularLoading";
import DashboardFooter from "@/components/Dashboard/DashboardPage/DashboardFooter/DashboardFooter";
import DashboardNavbar from "@/components/Dashboard/DashboardPage/DashboardNavbar/DashboardNavbar";
import { privacyPolicyNavList } from "@/data/DashboardSideBar";
import ApiService from "@/services/ApiServices";
import AuthService from "@/services/AuthServices";
import Utils from "@/services/Utils";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [objItem, setObjItem] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const res = await ApiService.getPrivacyPolicy();
      const data = res.page_content;
      setObjItem(data);
      if (res.error) {
        throw new Error(res.message);
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (objItem && Object.keys(objItem).length > 0) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objItem]);

  if (isLoading) return <PageCircularLoading />;
  return (
    <>
      <Head>
        <title>{objItem?.page_title || "N/A"}</title>
      </Head>
      <DashboardNavbar
        lstNav={!AuthService.isUserLoggedIn() && privacyPolicyNavList}
        isRouter={true}
        isLogin={AuthService.isUserLoggedIn() ? false : true}
      />
      <div className="bg-white min-h-[85vh] h-full">
        <p className="text-center pt-16 py-8 text-5xl font-bold">
          {objItem?.page_title || "N/A"}
        </p>
        <div
          className="text-center"
          dangerouslySetInnerHTML={{ __html: objItem?.page_content || "N/A" }}
        ></div>
      </div>
      <DashboardFooter fullWidth={true} />
    </>
  );
}

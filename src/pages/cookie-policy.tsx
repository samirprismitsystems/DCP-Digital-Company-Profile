import PageCircularLoading from "@/common/PageCircularLoading";
import DashboardFooter from "@/components/DashboardPage/DashboardFooter/DashboardFooter";
import DashboardNavbar from "@/components/DashboardPage/DashboardNavbar/DashboardNavbar";
import { privacyPolicyNavList } from "@/data/DashboardSideBar";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function CookiePolicy() {
  const [objItem, setObjItem] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getCookiePolicy();
      const data = res.page_content;
      setObjItem(data);
      if (res.error) {
        throw new Error(res.message);
      }
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <PageCircularLoading />;
  return (
    <>
      <Head>
        <title>{objItem?.page_title || "N/A"}</title>
      </Head>
      <DashboardNavbar lstNav={privacyPolicyNavList} isLogin={true} />
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

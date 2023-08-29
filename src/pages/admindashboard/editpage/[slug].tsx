import AuthGuard from "@/AuthGuards/AuthGuards";
import PageCircularLoading from "@/common/PageCircularLoading";
import AdminAddPagesPage from "@/components/Admin/AdminAddPagesPage/AdminAddPagesPage";
import AdminNormalLayout from "@/layouts/AdminNormalLayout";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { IPagesPageInfo } from "@/types/commonTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditAdminPages() {
  const [isLoading, setIsLoading] = useState(false);
  const [objPageInfo, setObjPageInfo] = useState<IPagesPageInfo>();
  const router = useRouter();
  const slugID = router.query.slug;

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getAllPagesInfo();
      if (!res.error) {
        const result = res.pages.find((item: IPagesPageInfo) => {
          if (item.page_id === slugID) {
            return item;
          }
        });
        setObjPageInfo(result || []);
        return null;
      }

      throw new Error(res.message);
    } catch (ex: any) {
      Utils.showErrorMessage(ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) return <PageCircularLoading />;
  return (
    <AuthGuard>
      <AdminNormalLayout>
        <AdminAddPagesPage objPageInfo={objPageInfo} />
      </AdminNormalLayout>
    </AuthGuard>
  );
}

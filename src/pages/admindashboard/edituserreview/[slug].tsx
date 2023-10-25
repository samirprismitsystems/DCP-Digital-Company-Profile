import AdminEditUserReview from "@/components/Admin/EditUserReview/EditUserReview";
import AdminNormalLayout from "@/layouts/AdminNormalLayout";
import ApiService from "@/services/ApiServices";
import Utils from "@/services/Utils";
import { IAdminUserReview } from "@/types/commonTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditUserReview() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [objItem, setObjItem] = useState<IAdminUserReview>(
    {} as IAdminUserReview
  );
  const router = useRouter();
  const reviewID: any = router.query.slug;

  const loadData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiService.getAllAdminUserReview();
      if (!res.error) {
        const lstReview: IAdminUserReview[] = res.review;

        if (reviewID) {
          let objInfo = lstReview.find((item) => {
            if (parseInt(item.review_id) === parseInt(reviewID)) {
              return item;
            }
          });

          if (objInfo) setObjItem(objInfo);
        }

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

  useEffect(() => {
    loadData();
  }, [router.query.slug]);

  return (
    <AdminNormalLayout>
      <AdminEditUserReview objItem={objItem} />
    </AdminNormalLayout>
  );
}

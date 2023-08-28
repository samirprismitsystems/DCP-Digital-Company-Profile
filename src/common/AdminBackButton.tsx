import { lstAdminDashboardPanels } from "@/data/DashboardSideBar";
import { useAppSelector } from "@/services/store/hooks/hooks";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { RootState } from "@/services/store/store";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function AdminBackButton({
  backPath,
  index,
}: {
  backPath?: string;
  index?: number;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedIndex = useAppSelector(
    (state: RootState) => state.dashboard.selectedIndex
  );

  const handleBack = () => {
    const url = router.pathname;
    const parts = url.split("/");
    const editPageString = parts[2];
    
    if (editPageString === "editpage") {
      router.push('/admindashboard/pages');
      return null;
    }

    if (!index) {
      let isDataValid: any = lstAdminDashboardPanels.find((item) => {
        if (item.id === selectedIndex - 1) {
          return item;
        }
        return false;
      });

      if (isDataValid) {
        dispatch(
          setSelectedObj({
            selectedIndex: isDataValid.id,
            selectedTitle: isDataValid.link,
          })
        );

        if (typeof window !== "undefined") {
          window.history.replaceState(
            isDataValid.link,
            "",
            `/admindashboard/${isDataValid.link}`
          );
        }
      }
    }

    if (index) {
      if (backPath) {
        dispatch(
          setSelectedObj({
            selectedIndex: index,
            selectedTitle: backPath,
          })
        );
        dispatch(setRouteIsChanged(true));
        if (typeof window !== "undefined") {
          window.history.replaceState(
            backPath,
            "",
            `/admindashboard/${backPath}`
          );
        }
      }
    }
  };

  return (
    <>
      <button
        onClick={handleBack}
        className="cursor-pointer bg-[#666666] text-white  border-0 transition transition-[all 0.3s linear] rounded-xl min-w-[auto] py-4 px-7 font-normal text-2xl text-center mb-16 capitalize"
      >
        <FontAwesomeIcon
          size="lg"
          className="mr-4  font-extrabold text-white"
          icon={faArrowLeft}
        />
        <span className="font-medium">Back</span>
      </button>
    </>
  );
}

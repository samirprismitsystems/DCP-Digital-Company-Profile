import { lstAdminDashboardPanels } from "@/data/DashboardSideBar";
import { useAppSelector } from "@/services/store/hooks/hooks";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { RootState } from "@/services/store/store";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function AdminBackButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedIndex = useAppSelector(
    (state: RootState) => state.dashboard.selectedIndex
  );

  const handleBack = () => {
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

      window.history.replaceState(
        isDataValid.link,
        "",
        `/admindashboard/${isDataValid.link}`
      );
    } else {
      router.back();
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

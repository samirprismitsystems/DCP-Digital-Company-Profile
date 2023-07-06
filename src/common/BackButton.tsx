import { lstDashboardPanels } from "@/data/DashboardSideBar";
import { useAppSelector } from "@/services/store/hooks/hooks";
import { RootState } from "@/services/store/store";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();
  const selectedIndex = useAppSelector(
    (state: RootState) => state.dashboard.selectedIndex
  );

  const handleBack = () => {
    let isDataValid: any = lstDashboardPanels.find((item) => {
      if (item.id === selectedIndex - 1) {
        return item;
      }
      return false;
    });

    if (isDataValid) {
      router.push(isDataValid.link);
    }
  };
  return (
    <>
      <button
        onClick={handleBack}
        className="text-white cursor-pointer bg-[#666666] border-0 hover:transition-all hover:duration-300 hover:ease-linear rounded-xl text-[2rem] min-w-[12rem] mb-16 px-10 py-3 font-semibold"
      >
        <FontAwesomeIcon
          size="1x"
          className="mr-4 font-bold"
          icon={faArrowLeft}
        />
        Back
      </button>
    </>
  );
}

import { lstDashboardPanels } from "@/data/DashboardSideBar";
import { useAppSelector } from "@/services/store/hooks/hooks";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { RootState } from "@/services/store/store";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function DashboardCommonButtons({
  hideSaveButton,
  hideNextButton,
}: {
  hideSaveButton?: boolean;
  hideNextButton?: boolean;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedIndex = useAppSelector(
    (state: RootState) => state.dashboard.selectedIndex
  );

  const handleNextPage = () => {
    let isDataValid: any = lstDashboardPanels.find((item) => {
      if (item.id === selectedIndex + 1) {
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
          `/dashboard/${isDataValid.link}`
        );
      }
    }
  };

  return (
    <>
      <div className="flex justify-end w-full ml_0_common_button">
        <div className="form_field pb-16 sm:space-x-8 xl:w-1/4 xs:w-full md:w-[80%] lg:w-[40%] flex justify-end xs:flex-col xs:space-y-6 sm:flex-row sm:space-y-0">
          {!hideSaveButton && (
            <button
              style={{
                transition: "all 0.3s linear",
              }}
              type="submit"
              className={`py-4 ${
                hideNextButton && "px-8"
              } font-medium text-center text-3xl hover:text-white ${
                hideNextButton
                  ? "xs:w-[100%] sm:w-[40%] lg:w-[70%] xl:w-[60%]"
                  : "w-full"
              } text-primary-light bg-primary-main  hover:bg-secondary-main border-[1px] border-secondary-main rounded-[5rem]`}
            >
              Save Changes
            </button>
          )}
          {!hideNextButton && (
            <button
              style={{
                transition: "all 0.3s linear",
              }}
              type="button"
              className="py-4 hover:cursor-pointer font-medium text-center text-3xl xs:w-full sm:w-[60%] bg-secondary-main border-[1px] border-secondary-main btnHoverEffect text-white rounded-[5rem]"
              onClick={handleNextPage}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}

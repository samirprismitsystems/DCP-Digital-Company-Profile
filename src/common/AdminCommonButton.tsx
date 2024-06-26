import { lstAdminDashboardPanels } from "@/data/DashboardSideBar";
import { useAppSelector } from "@/services/store/hooks/hooks";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { RootState } from "@/services/store/store";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function AdminCommonButton({
  hideSaveButton,
  hideNextButton,
  isLeft,
  saveBtnTitle,
}: {
  hideSaveButton?: boolean;
  hideNextButton?: boolean;
  isLeft?: boolean;
  saveBtnTitle?: string;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedIndex = useAppSelector(
    (state: RootState) => state.dashboard.selectedIndex
  );

  const handleNextPage = () => {
    let isDataValid: any = lstAdminDashboardPanels.find((item) => {
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
          `/admindashboard/${isDataValid.link}`
        );
      }
    }
  };

  return (
    <>
      <div
        className={`flex ${isLeft ? "justify-start" : "justify-end"} w-full`}
      >
        <div
          className={`xs:space-y-4 sm:space-y-0 form_field pb-16 space-x-8 xs:flex-col sm:flex-row flex ${
            isLeft ? "justify-start" : "justify-end"
          }  ${
            hideSaveButton
              ? "xl:w-[15%] pt-8 xs:w-full sm:w-[33%] md:w-[33%] lg:w-[35%]"
              : "xl:w-1/4 xs:w-full md:w-[80%] lg:w-[40%]"
          }`}
        >
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
                  ? !isLeft
                    ? "xs:w-[100%] xsOne:w-[50%] lg:w-[70%] xl:w-[80%]"
                    : "xs:w-full sm:w-[35%] md:w-[30%] lg:w-[50%] w-9/12"
                  : "w-full"
              } text-primary-light bg-primary-main  hover:bg-secondary-main border-[1px] border-secondary-main rounded-[5rem]`}
            >
              {saveBtnTitle ? saveBtnTitle : "Save Changes"}
            </button>
          )}
          {!hideNextButton && (
            <button
              style={{
                transition: "all 0.3s linear",
              }}
              type="button"
              className="ml_0_common_button xs:w-full py-4 hover:cursor-pointer font-medium text-center text-3xl w-[60%] bg-secondary-main border-[1px] border-secondary-main btnHoverEffect text-white rounded-[5rem]"
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

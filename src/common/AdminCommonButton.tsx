import { lstAdminDashboardPanels } from "@/data/DashboardSideBar";
import { useAppSelector } from "@/services/store/hooks/hooks";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { RootState } from "@/services/store/store";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function AdminCommonButton({
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
      window.history.replaceState(
        isDataValid.link,
        "",
        `/admindashboard/${isDataValid.link}`
      );
    }
  };

  return (
    <>
      <div className="flex justify-end w-full">
        <div
          className={`form_field pb-16 space-x-8 flex justify-end  ${
            hideSaveButton
              ? "xl:w-[20%] pt-8 xs:w-[73%] sm:w-[33%] md:w-[33%] lg:w-[35%]"
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
                hideNextButton ? "w-9/12" : "w-full"
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
              className="py-4 hover:cursor-pointer font-medium text-center text-3xl w-[60%] bg-secondary-main border-[1px] border-secondary-main btnHoverEffect text-white rounded-[5rem]"
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

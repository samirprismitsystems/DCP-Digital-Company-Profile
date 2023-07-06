import { lstDashboardPanels } from "@/data/DashboardSideBar";
import { useAppSelector } from "@/services/store/hooks/hooks";
import { RootState } from "@/services/store/store";
import { useRouter } from "next/router";

export default function DashboardCommonButtons({
  hideSaveButton,
}: {
  hideSaveButton?: boolean;
}) {
  const router = useRouter();

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
      router.push(isDataValid.link);
    }
  };

  return (
    <>
      <div className="flex justify-end w-full">
        <div className="form_field pb-16 space-x-8 xl:w-1/4 xs:w-full md:w-[80%] lg:w-[40%] flex justify-end">
          {!hideSaveButton && (
            <button
              style={{
                transition: "all 0.3s linear",
              }}
              type="submit"
              className="py-4 font-medium text-center text-3xl w-full hover:text-white text-primary-light bg-primary-main hover:bg-secondary-main border-[1px] border-secondary-main rounded-[5rem]"
            >
              Save Changes
            </button>
          )}
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
        </div>
      </div>
    </>
  );
}

import { lstDashboardNavigationMenu } from "@/data/NavigationMenu";
import Utils from "@/services/Utils";
import { useAppSelector } from "@/services/store/hooks/hooks";
import { RootState } from "@/services/store/store";
import { INavigationMenu } from "@/types/commonTypes";
import { useRouter } from "next/router";

export default function DashboardNavigationMenu() {
  const websiteSlug = useAppSelector(
    (state: RootState) => state.dashboard.websiteSlug
  );

  const router = useRouter();
  return (
    <>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-[500] font-Montserrat flex justify-center items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
          {lstDashboardNavigationMenu &&
            lstDashboardNavigationMenu.map(
              (item: INavigationMenu, index: number) => (
                <button
                  key={index}
                  className={`text-[2.0rem] block px-2 py-3  text-secondary-main font-[500]`}
                  onClick={(event: any) => {
                    event.preventDefault();
                    if (item.target) {
                      window.open(`/${websiteSlug}`, "_blank");
                    } else {
                      router.push(item.link);
                    }
                  }}
                >
                  {item.name}
                </button>
              )
            )}
          <li>
            <button
              className="border py-2 px-9 btnHoverEffect  text-white block  text-center"
              onClick={() => {
                Utils.clearStorage();
                router.push("/login");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

import { lstDashboardNavigationMenu } from "@/data/NavigationMenu";
import Utils from "@/services/Utils";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { INavigationMenu } from "@/types/commonTypes";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function DashboardNavigationMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  return (
    <>
      <div className="w-full md:w-auto" id="navbar-default">
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
                      window.open(`/${Utils.getItem("slug")}`, "_blank");
                    } else {
                      dispatch(
                        setSelectedObj({
                          selectedIndex: 0,
                          selectedTitle: "profile",
                        })
                      );
                      dispatch(setRouteIsChanged(true));
                      window.history.replaceState(
                        "proile",
                        "",
                        `/dashboard/profile`
                      );
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

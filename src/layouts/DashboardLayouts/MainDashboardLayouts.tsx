import DashboardFooter from "@/components/DashboardPage/DashboardFooter/DashboardFooter";
import DashboardNavbar from "@/components/DashboardPage/DashboardNavbar/DashboardNavbar";
import { lstDashboardPanels } from "@/data/DashboardSideBar";
import { useAppDispatch, useAppSelector } from "@/services/store/hooks/hooks";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { RootState } from "@/services/store/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MainDashboardLayouts({ children }: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selectedIndex, selectedTitle } = useAppSelector(
    (state: RootState) => state.dashboard
  );
  
  const loadData = () => {
    let link = window.location.pathname;
    let modifiedLink = link.replace(/\/dashboard\//, "");
    lstDashboardPanels.forEach((item) => {
      if (item.link === modifiedLink) {
        dispatch(setSelectedObj({
          selectedIndex: item.id,
          selectedTitle: item.name,
        }));
      }
    });
  };
  
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Head>
        <title>{selectedTitle || "Digital Company Profile"}</title>
      </Head>
      <DashboardNavbar />
      <section className="main">
        <div className="container-fluid">
          <div className="flex -mx-[12px] flex-nowrap">
            <div className="left_sidebar_nav text-white w-[35rem] p-12 bg-secondary-greyDark">
              <ul className="sticky top-52 w-full list-none m-0 p-0">
                {lstDashboardPanels &&
                  lstDashboardPanels.map((item, index: number) => (
                    <li
                      key={item.id}
                      className={`text-white ${
                        selectedIndex !== item.id
                          ? "bg-secondary-dark"
                          : "bg-secondary-main"
                      } rounded-xl mb-6 flex items-center p-10 text-3xl relative z-10 hover:bg-secondary-main hover:cursor-pointer`}
                      onClick={() => {
                        dispatch(
                          setSelectedObj({
                            selectedIndex: index + 1,
                            selectedTitle: item.link,
                          })
                        );
                        router.push(`/dashboard/${item.link}`);
                      }}
                    >
                      <div className="flex justify-center items-center">
                        <img
                          src={item.icon}
                          className="w-16 h-auto mr-6"
                          alt=""
                        />
                        <span>{item.name}</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            {children}
          </div>
        </div>
      </section>
      <DashboardFooter />
    </>
  );
}

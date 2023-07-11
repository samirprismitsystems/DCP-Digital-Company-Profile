import DashboardFooter from "@/components/DashboardPage/DashboardFooter/DashboardFooter";
import DashboardNavbar from "@/components/DashboardPage/DashboardNavbar/DashboardNavbar";
import { lstDashboardPanels } from "@/data/DashboardSideBar";
import Utils from "@/services/Utils";
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
    const modifiedLink = window.location.pathname.replace(/\/dashboard\//, "");
    const selectedItem = lstDashboardPanels.find(
      (item) => item.link === modifiedLink
    );

    if (selectedItem) {
      const { id, link } = selectedItem;
      dispatch(setSelectedObj({ selectedIndex: id, selectedTitle: link }));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Head>
        <title>
          {Utils.capitalizeFirstLetter(selectedTitle) ||
            "Digital Company Profile"}
        </title>
      </Head>
      <DashboardNavbar />
      <section className="main">
        <div className="container-fluid">
          <div className="flex -mx-[12px] flex-nowrap">
            <div className="left_sidebar_nav text-white lg:w-[35rem] xs:w-[8rem] md:w-[25rem] xs:p-4  md:p-12 bg-secondary-greyDark">
              <ul className="sticky md:top-40 xs:top-44 w-full list-none m-0 p-0">
                {lstDashboardPanels &&
                  lstDashboardPanels.map((item, index: number) => (
                    <li
                      key={item.id}
                      className={`text-white ${
                        selectedIndex !== item.id
                          ? "bg-secondary-dark"
                          : "bg-secondary-main"
                      } rounded-xl mb-6 flex items-center md:p-10 xs:p-5 text-3xl relative z-10 hover:bg-secondary-main hover:cursor-pointer`}
                      onClick={() => {
                        router.push(`/dashboard/${item.link}`);
                      }}
                    >
                      <div className="flex justify-center items-center">
                        <img
                          src={item.icon}
                          className="w-16 h-auto md:mr-6 xs:m-0"
                          alt="error"
                        />
                        <span className="xs:hidden md:block">{item.name}</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="right_sidebar_content xl:p-12 bg-white lg:w-[calc(100%-35rem)] md:w-[calc(100%-25rem)] xs:w-[calc(100%-8rem)] xs:p-8">
              {children}
            </div>
          </div>
        </div>
      </section>
      <DashboardFooter />
    </>
  );
}

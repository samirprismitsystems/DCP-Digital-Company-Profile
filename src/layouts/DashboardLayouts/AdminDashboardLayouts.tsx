import PageCircularLoading from "@/common/PageCircularLoading";
import AdminAddCompanyPage from "@/components/Admin/AdminAddCompanyPage/AdminAddCompanyPage";
import AdminAddPagesPage from "@/components/Admin/AdminAddPagesPage/AdminAddPagesPage";
import AdminAddSocialColorPage from "@/components/Admin/AdminAddSocialColorPage/AdminAddSocialColorPage";
import AdminAddUserReviewPage from "@/components/Admin/AdminAddUserReviewPage/AdminAddUserReviewPage";
import AdminChangePasswordPage from "@/components/Admin/AdminChangePasswordPage/AdminChangePasswordPage";
import AdminCompanyPage from "@/components/Admin/AdminCompanyPage/AdminCompanyPage";
import AdminDashboardNavbar from "@/components/Admin/AdminDashboardNavbar/AdminDashboardNavbar";
import AdminDashboardPage from "@/components/Admin/AdminDashboardPage/AdminDashboardPage";
import AdminPagesPage from "@/components/Admin/AdminPagesPage/AdminPagesPage";
import AdminProfilePage from "@/components/Admin/AdminProfilePage/AdminProfilePage";
import AdminReviewPage from "@/components/Admin/AdminReviewPage/AdminReviewPage";
import AdminSettingPage from "@/components/Admin/AdminSettingPage/AdminSettingPage";
import AdminSocialMediaPage from "@/components/Admin/AdminSocialMediaPage/AdminSocialMediaPage";
import AdminThemePage from "@/components/Admin/AdminThemePage/AdminThemePage";
import DashboardFooter from "@/components/DashboardPage/DashboardFooter/DashboardFooter";
import { lstAdminDashboardPanels } from "@/data/DashboardSideBar";
import Utils from "@/services/Utils";
import { useAppDispatch, useAppSelector } from "@/services/store/hooks/hooks";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { RootState } from "@/services/store/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export default function AdminDashboardLayout({ children }: any) {
  const dispatch = useAppDispatch();
  const routeIsChanged = useAppSelector((s) => s.common.routeIsChanged);

  const [dashboardContent, setDashboardContent] = useState<
    ReactNode | null | undefined
  >(null);
  const router = useRouter();
  const { selectedIndex, selectedTitle } = useAppSelector(
    (state: RootState) => state.dashboard
  );

  const loadData = () => {
    const modifiedLink = window.location.pathname.replace(
      /\/admindashboard\//,
      ""
    );

    if (modifiedLink === "/admindashboard") {
      dispatch(
        setSelectedObj({ selectedIndex: 0, selectedTitle: "admindashboard" })
      );
      dispatch(setRouteIsChanged(true));
    } else if (modifiedLink === "profile") {
      dispatch(setSelectedObj({ selectedIndex: 0, selectedTitle: "profile" }));
      dispatch(setRouteIsChanged(true));
    } else if (modifiedLink === "addsocialcolors") {
      dispatch(
        setSelectedObj({ selectedIndex: 2, selectedTitle: "addsocialcolors" })
      );
      dispatch(setRouteIsChanged(true));
    } else if (modifiedLink === "adduserreview") {
      dispatch(
        setSelectedObj({ selectedIndex: 4, selectedTitle: "adduserreview" })
      );
      dispatch(setRouteIsChanged(true));
    } else if (modifiedLink === "addpages") {
      dispatch(setSelectedObj({ selectedIndex: 3, selectedTitle: "addpages" }));
      dispatch(setRouteIsChanged(true));
    } else if (modifiedLink === "addcompany") {
      dispatch(
        setSelectedObj({ selectedIndex: 0, selectedTitle: "addcompany" })
      );
      dispatch(setRouteIsChanged(true));
    } else if (modifiedLink === "changepassword") {
      dispatch(
        setSelectedObj({ selectedIndex: 0, selectedTitle: "changepassword" })
      );
      dispatch(setRouteIsChanged(true));
    } else {
      const selectedItem = lstAdminDashboardPanels.find(
        (item) => item.link === modifiedLink
      );

      if (selectedItem) {
        const { id, link } = selectedItem;
        dispatch(setSelectedObj({ selectedIndex: id, selectedTitle: link }));
        dispatch(setRouteIsChanged(true));
        return null;
      }

      dispatch(setRouteIsChanged(true));
    }
  };

  useEffect(() => {
    if (routeIsChanged || selectedIndex) {
      switch (selectedTitle) {
        case "admindashboard":
          setDashboardContent(<AdminDashboardPage />);
          break;
        case "profile":
          setDashboardContent(<AdminProfilePage />);
          break;
        case "changepassword":
          setDashboardContent(<AdminChangePasswordPage />);
          break;
        case "addsocialcolors":
          setDashboardContent(<AdminAddSocialColorPage />);
          break;
        case "adduserreview":
          setDashboardContent(<AdminAddUserReviewPage />);
          break;
        case "addcompany":
          setDashboardContent(<AdminAddCompanyPage />);
          break;
        case "addpages":
          setDashboardContent(<AdminAddPagesPage />);
          break;
        case "companylist":
          setDashboardContent(<AdminCompanyPage />);
          break;
        case "socialmediaadd":
          setDashboardContent(<AdminSocialMediaPage />);
          break;
        case "pages":
          setDashboardContent(<AdminPagesPage />);
          break;
        case "userreview":
          setDashboardContent(<AdminReviewPage />);
          break;
        case "addtheme":
          setDashboardContent(<AdminThemePage />);
          break;
        case "setting":
          setDashboardContent(<AdminSettingPage />);
          break;
        default:
          setDashboardContent(undefined);
          break;
      }

      dispatch(setRouteIsChanged(false));
    }
  }, [routeIsChanged, selectedIndex]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Head>
        <title>
          {Utils.capitalizeFirstLetter(selectedTitle) || "Admin Dashboard"}
        </title>
      </Head>
      <AdminDashboardNavbar />
      <section className="main">
        <div className="container-fluid">
          <div className="flex -mx-[12px] flex-nowrap">
            <div className="left_sidebar_nav text-white lg:w-[35rem] xs:w-[8rem] md:w-[25rem] xs:p-4  md:p-12 bg-secondary-greyDark">
              <ul className="sticky md:top-40 xs:top-44 w-full list-none m-0 p-0">
                {lstAdminDashboardPanels &&
                  lstAdminDashboardPanels.map((item, index: number) => (
                    <li
                      key={item.id}
                      className={`text-white ${
                        selectedIndex !== item.id
                          ? "bg-secondary-dark"
                          : "bg-secondary-main"
                      } rounded-xl mb-6 flex items-center md:p-10 xs:p-5 text-3xl relative z-10 hover:bg-secondary-main hover:cursor-pointer`}
                      onClick={() => {
                        dispatch(
                          setSelectedObj({
                            selectedIndex: item.id,
                            selectedTitle: item.link,
                          })
                        );
                        window.history.replaceState(
                          item.link,
                          "",
                          `/admindashboard/${item.link}`
                        );
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
              {dashboardContent === null ? (
                <PageCircularLoading />
              ) : dashboardContent ? (
                dashboardContent
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </section>
      <DashboardFooter />
    </>
  );
}

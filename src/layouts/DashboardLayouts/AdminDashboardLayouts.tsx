import PageCircularLoading from "@/common/PageCircularLoading";
import AdminDashboardNavbar from "@/components/Admin/AdminDashboardNavbar/AdminDashboardNavbar";
import AdminDashboardPage from "@/components/Admin/AdminDashboardPage/AdminDashboardPage";
import ClientPage from "@/components/ClientPage/ClientPage";
import CompanyDetailsPage from "@/components/CompanyDetailsPage/CompanyDetailsPage";
import DashboardFooter from "@/components/DashboardPage/DashboardFooter/DashboardFooter";
import ImageGalleryPage from "@/components/ImageGalleryPage/ImageGalleryPage";
import ProductPage from "@/components/ProductPage/ProductPage";
import ServicePage from "@/components/ServicePage/ServicePage";
import SocialLinksPage from "@/components/SocialLinksPage/SocialLinksPage";
import { lstAdminDashboardPanels } from "@/data/DashboardSideBar";
import Utils from "@/services/Utils";
import { useAppDispatch, useAppSelector } from "@/services/store/hooks/hooks";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { RootState } from "@/services/store/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export default function AdminDashboardLayout({ children }: any) {
  const dispatch = useAppDispatch();
  const [routeIsChanged, setRouteIsChanged] = useState(false);
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
      setRouteIsChanged(true);
    } else {
      const selectedItem = lstAdminDashboardPanels.find(
        (item) => item.link === modifiedLink
      );

      if (selectedItem) {
        const { id, link } = selectedItem;
        dispatch(setSelectedObj({ selectedIndex: id, selectedTitle: link }));
      }
    }
  };

  useEffect(() => {
    if (routeIsChanged || selectedIndex) {
      switch (selectedTitle) {
        case "admindashboard":
          setDashboardContent(<AdminDashboardPage />);
          break;
        case "companylist":
          setDashboardContent(<CompanyDetailsPage />);
          break;
        case "socailmediaadd":
          setDashboardContent(<SocialLinksPage />);
          break;
        case "pages":
          setDashboardContent(<ProductPage />);
          break;
        case "userreview":
          setDashboardContent(<ServicePage />);
          break;
        case "addtheme":
          setDashboardContent(<ClientPage />);
          break;
        case "setting":
          setDashboardContent(<ImageGalleryPage />);
          break;
        default:
          setDashboardContent(undefined);
          break;
      }

      setRouteIsChanged(false);
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
      <AdminDashboardNavbar setRouteIsChanged={setRouteIsChanged} />
      <section className="main">
        <div className="container-fluid">
          <div className="flex -mx-[12px] flex-nowrap">
            <div className="left_sidebar_nav fixed  w-[35rem]  bg-secondary-greyDark p-12 z-[99] overflow-y-auto  overflow-x-hidden">
              <ul className="sticky  w-full list-none m-0 p-0">
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
            <div className="right_sidebar_content p-12  bg-white ml-[35rem] mb-28 max-w-full">
              {dashboardContent === null ? (
                <PageCircularLoading />
              ) : (
                dashboardContent
              )}
            </div>
          </div>
          <DashboardFooter />
        </div>
      </section>
    </>
  );
}

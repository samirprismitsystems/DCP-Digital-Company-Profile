import PageCircularLoading from "@/common/PageCircularLoading";
import ClientPage from "@/components/ClientPage/ClientPage";
import CompanyDetailsPage from "@/components/CompanyDetailsPage/CompanyDetailsPage";
import DashboardFooter from "@/components/DashboardPage/DashboardFooter/DashboardFooter";
import DashboardNavbar from "@/components/DashboardPage/DashboardNavbar/DashboardNavbar";
import DashboardPage from "@/components/DashboardPage/DashboardPage";
import EnquiryPage from "@/components/EnquiryPage/EnquiryPage";
import ImageGalleryPage from "@/components/ImageGalleryPage/ImageGalleryPage";
import PaymentOptionPage from "@/components/PaymentOptionPage/PaymentOptionPage";
import ProductPage from "@/components/ProductPage/ProductPage";
import ServicePage from "@/components/ServicePage/ServicePage";
import SocialLinksPage from "@/components/SocialLinksPage/SocialLinksPage";
import TestimonialPage from "@/components/TestimonialPage/TestimonialPage";
import ThemesPage from "@/components/ThemesPage/ThemesPage";
import UserChangePasswordPage from "@/components/UserChangePasswordPage/UserChangePasswordPage";
import UserProfilePage from "@/components/UserProfilePage/UserProfilePage";
import { lstDashboardPanels } from "@/data/DashboardSideBar";
import Utils from "@/services/Utils";
import { useAppDispatch, useAppSelector } from "@/services/store/hooks/hooks";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { setSelectedObj } from "@/services/store/slices/dashboardSlice";
import { RootState } from "@/services/store/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export default function MainDashboardLayouts({ children }: any) {
  const dispatch = useAppDispatch();
  const routeIsChanged = useAppSelector(
    (s: RootState) => s.common.routeIsChanged
  );

  const [dashboardContent, setDashboardContent] = useState<
    ReactNode | null | undefined
  >(null);
  const router = useRouter();
  const { selectedIndex, selectedTitle } = useAppSelector(
    (state: RootState) => state.dashboard
  );

  const loadData = () => {
    if (typeof window !== "undefined") {
      const modifiedLink = window.location.pathname.replace(
        /\/dashboard\//,
        ""
      );
      if (modifiedLink === "/dashboard") {
        dispatch(
          setSelectedObj({ selectedIndex: 0, selectedTitle: "dashboard" })
        );
        dispatch(setRouteIsChanged(true));
      } else if (modifiedLink === "profile") {
        dispatch(
          setSelectedObj({ selectedIndex: 0, selectedTitle: "profile" })
        );
        dispatch(setRouteIsChanged(true));
      } else if (modifiedLink === "changepassword") {
        dispatch(
          setSelectedObj({ selectedIndex: 0, selectedTitle: "changepassword" })
        );
        dispatch(setRouteIsChanged(true));
      } else {
        const selectedItem = lstDashboardPanels.find(
          (item) => item.link === modifiedLink
        );

        if (selectedItem) {
          const { id, link } = selectedItem;
          dispatch(setSelectedObj({ selectedIndex: id, selectedTitle: link }));
        }
      }
    }
  };

  useEffect(() => {
    if (routeIsChanged || selectedIndex) {
      switch (selectedTitle) {
        case "dashboard":
          setDashboardContent(<DashboardPage />);
          break;
        case "company":
          setDashboardContent(<CompanyDetailsPage />);
          break;
        case "sociallinks":
          setDashboardContent(<SocialLinksPage />);
          break;
        case "profile":
          setDashboardContent(<UserProfilePage />);
          break;
        case "changepassword":
          setDashboardContent(<UserChangePasswordPage />);
          break;
        case "product":
          setDashboardContent(<ProductPage />);
          break;
        case "service":
          setDashboardContent(<ServicePage />);
          break;
        case "client":
          setDashboardContent(<ClientPage />);
          break;
        case "portfolio":
          setDashboardContent(<ImageGalleryPage />);
          break;
        case "testimonial":
          setDashboardContent(<TestimonialPage />);
          break;
        case "enquiry":
          setDashboardContent(<EnquiryPage />);
          break;
        case "paymentoptions":
          setDashboardContent(<PaymentOptionPage />);
          break;
        case "themes":
          setDashboardContent(<ThemesPage />);
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
                        dispatch(
                          setSelectedObj({
                            selectedIndex: item.id,
                            selectedTitle: item.link,
                          })
                        );
                        if (typeof window !== "undefined") {
                          window.history.replaceState(
                            item.link,
                            "",
                            `/dashboard/${item.link}`
                          );
                        }
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

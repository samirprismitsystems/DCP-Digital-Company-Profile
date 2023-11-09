import AdminDashboardNavbar from "@/components/Admin/AdminDashboardNavbar/AdminDashboardNavbar";
import DashboardFooter from "@/components/Dashboard/DashboardPage/DashboardFooter/DashboardFooter";
import { lstAdminDashboardPanels } from "@/data/DashboardSideBar";
import Utils from "@/services/Utils";
import { useAppSelector } from "@/services/store/hooks/hooks";
import { setRouteIsChanged } from "@/services/store/slices/commonSlice";
import { RootState } from "@/services/store/store";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function AdminNormalLayout({ children }: any) {
  const { selectedIndex, selectedTitle } = useAppSelector(
    (state: RootState) => state.dashboard
  );
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          {Utils.capitalizeFirstLetter(selectedTitle) || "Admin Dashboard"}
        </title>
      </Head>
      <AdminDashboardNavbar />
      <section className="mainAdminLayouts">
        <div className="container-fluid">
          <div className="flex -mx-[12px] flex-nowrap">
            <div className="left_sidebar_nav text-white lg:w-[35rem] xs:w-[8rem] md:w-[25rem] xs:p-4  md:p-12 bg-secondary-greyDark fixed z-[9999]">
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
                        router.push(`/admindashboard/${item.link}`);
                        dispatch(setRouteIsChanged(true));
                      }}
                    >
                      <div className="flex justify-center items-center">
                        <Image
                          width={800}
                          height={800}
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
            <div className="right_sidebar_content xs:mb-[90px] sm:mb-[59px] xl:p-12 bg-white lg:w-[calc(100%-35rem)] md:w-[calc(100%-25rem)] xs:w-[calc(100%-8rem)] xs:p-8 xs:ml-[8rem] md:ml-[25rem] lg:ml-[35rem] xs:min-h-[85vh] lg:min-h-[83vh] xl:min-h-[86vh] xlTwo:min-h-[90vh] h-full">
              {children}
            </div>
          </div>
        </div>
      </section>
      <DashboardFooter />
    </>
  );
}

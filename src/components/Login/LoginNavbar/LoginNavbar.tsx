import NavigationMenu from "@/common/NavigationMenu";
import { loginPageNavigationMenuList } from "@/data/NavigationMenu";
import Link from "next/link";

export default function LoginNavbar() {
  return (
    <nav
      className={`"shadow-md" bg-white fixed w-full top-0 h-[10rem] z-10 p-t-[2.3rem] p-b-[1.5rem]`}
    >
      <div className="container-navbar custom-container xl:max-w-[1140px] xlOne:max-w-[1320px] xlTwo:max-w-[1800px] md:max-w-[720px] lg:max-w-[960px] w-full flex flex-wrap items-center justify-between pb-6 pt-6 mx-0">
        <Link
          href="/"
          className="flex items-center p-t-[.3125rem] text-[1.25rem]"
        >
          <h1 className=" self-center xs:text-[3.6rem] md:text-[4.6rem] whitespace-nowrap txtdark font-bold">
            DCP
          </h1>
        </Link>
        <NavigationMenu
          isNavigate={true}
          lstNavigationMenu={loginPageNavigationMenuList}
        />
      </div>
    </nav>
  );
}

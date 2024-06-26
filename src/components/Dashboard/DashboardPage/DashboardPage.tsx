import Dashboard from "./DashboardCards/Dashboard";

export default function DashboardPage() {
  return (
    <div className="tab_title mb-8 -mt-4">
      <div className="h2 xs:text-[2.5rem] xsOne:text-[3rem]">
        Company Dashboard
      </div>
      <div className="container xlOne:max-w-full mt-12 xs:mb-[11rem]">
        <div className="row xl:grid gap-20 grid-cols-4 xs:flex flex-wrap -mr-3 -ml-3 xs:flex-col sm:flex-row justify-center">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

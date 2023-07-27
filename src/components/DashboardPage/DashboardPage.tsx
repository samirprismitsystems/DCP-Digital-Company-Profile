import Dashboard from "./DashboardCards/Dashboard";

export default function DashboardPage() {
  return (
    <div className="tab_title mb-16 -mt-4 min-h-[75.3vh] w-full">
      <h3 className="font-bold">Company Dashboard</h3>
      <div className="container xlOne:max-w-full mt-12">
        <div className="row xl:grid gap-20 grid-cols-4 xs:flex flex-wrap -mr-3 -ml-3 xs:flex-col sm:flex-row justify-center">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

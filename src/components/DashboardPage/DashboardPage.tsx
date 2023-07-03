import { lstDashbordCards } from "@/data/DashbordCards";
import DashboardCards from "./DashboardCards/DashboardCards";

export default function DashboardPage() {
  return (
    <div className="right_sidebar_content p-12 bg-white">
      <div className="tab_title mb-8 -mt-4">
        <div className="h2">Company Dashboard</div>
        <div className="container xlOne:max-w-full mt-12">
          <div className="row grid gap-20 grid-cols-4 flex-wrap -mr-3 -ml-3">
            {lstDashbordCards &&
              lstDashbordCards.map((item) => (
                <div
                  key={item.id}
                  className="dashboard_card  max-w-full px-[12px]"
                >
                  <DashboardCards item={item} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

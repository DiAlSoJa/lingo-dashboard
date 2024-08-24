import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Newspaper } from "lucide-react";


export default function Home() {
  return (
    <div className="p-5">
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <DashboardCard
          title="Posts"
          count={100}
          icon={<Newspaper className="text-slate-200" size={72} />}
        />
        <DashboardCard
          title="Categories"
          count={12}
          icon={<Newspaper className="text-slate-200" size={72} />}
        />
        <DashboardCard
          title="Users"
          count={750}
          icon={<Newspaper className="text-slate-200" size={72} />}
        />
        <DashboardCard
          title="Comments"
          count={1200}
          icon={<Newspaper className="text-slate-200" size={72} />}
        />
      </div>
      <AnalyticsChart/>
      {/* <PostsTable title="Latest Posts" limit={5}/> */}
    </div>
  );
}

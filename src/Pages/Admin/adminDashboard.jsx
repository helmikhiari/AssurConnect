import React from "react";
import DashboardCard from "../../components/dashboardCard";
import {
  BadgeIcon,
  CreditCardIcon,
  DollarSignIcon,
  Icon,
  MapIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";
import { LineChart } from "@mui/x-charts";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import PieChartt from "../../components/ui/PieChart";
function AdminDashboard() {
  const xLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const income = [
    10000, 12500, 11000, 13500, 11100, 9500, 15000, 8000, 10000, 11000, 11000,
    13000,
  ];
  const users = [
    { value: 70, label: "Assurances" },
    { value: 120, label: "Companies" },
    { value: 5000, label: "Employees-Patients" },
    { value: 400, label: "Doctors" },
    { value: 200, label: "Pharmacies" },
  ];
  const colors = ["#ed1f17", "#009efa", "#f4bc2b", "#b0b0eb", "#1a1d45"];
  return (
    <div className="space-y-4">
      {/* <span className='text-black font-bold text-xl flex  w-full'>Welcome Back,Admin</span> */}
      <div className="grid grid-cols-3 gap-4">
        <DashboardCard
          title="Users"
          number="7,254"
          subNumber="+254 from last month"
        >
          <UsersIcon className="w-6 h-6" />
        </DashboardCard>
        <DashboardCard
          title="Total Income"
          subNumber="+4% from last month"
          number="14,154 TND"
        >
          <DollarSignIcon className="w-6 h-6" />
        </DashboardCard>
        <DashboardCard
          title="Total Plans"
          number="102"
          subNumber="+14 from last month"
        >
          <CreditCardIcon className="w-6 h-6" />
        </DashboardCard>
      </div>
      <Card className="overflow-x-auto min-w-96  shadow-sm hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-left">Financial Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            series={[
              {
                data: income,
                label: "Income",
                color: "#4CAF50",
                curve: "linear",
              },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            height={300}
          />
        </CardContent>
      </Card>
      <Card className="min-w-96  shadow-sm hover:shadow-2xl transition-all duration-500">
        <CardHeader>
          <CardTitle>Users Category</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChartt data={users} colors={colors} />
        </CardContent>
      </Card>
    </div>
  );
}
export default AdminDashboard;
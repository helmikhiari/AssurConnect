import React, { useEffect, useState } from "react";
import DashboardCard from "../../../../components/dashboardCard";
import { ClipboardIcon, FileIcon } from "lucide-react";
import { BarChart, LineChart } from "@mui/x-charts";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
function AssuranceDashboard() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const premiumIncomeData = [
    7000, 9500, 8000, 10500, 9200, 7500, 8500, 5000, 7000, 7900, 8900, 10000,
  ];
  const claimsPaidData = [
    5000, 8000, 10000, 12000, 4500, 8000, 6000, 2200, 5000, 8200, 10000, 7000,
  ];
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
  const riskExposure = [
    10000, 12500, 11000, 13500, 11100, 9500, 10500, 8000, 10000, 11000, 11000,
    13000,
  ];

  const potentialRiskExposure = [
    12000, 13000, 11500, 14000, 12500, 10500, 11500, 8500, 11000, 12000, 12000,
    14000,
  ];
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Total Plans" number="11">
          <ClipboardIcon className="w-6 h-6" />
        </DashboardCard>
        <DashboardCard
          title="Total Actif Plans"
          subNumber="+5.2% from last month"
          number={"24"}
        >
          <FileIcon className="w-6 h-6" />
        </DashboardCard>
        <DashboardCard
          title="Claims Processed"
          number="620"
          subNumber="+8% this month"
        >
          <ClipboardIcon className="w-6 h-6" />
        </DashboardCard>
      </div>
      <Card className="overflow-x-auto min-w-96 mt-5 shadow-sm hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-left">Financial Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            series={[
              {
                data: premiumIncomeData,
                label: "Premuim Income",
                color: "#4CAF50",
                curve: "linear",
              },
              {
                data: claimsPaidData,
                label: "Claims Paid",
                color: "red",
                curve: "linear",
              },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
            //   width={width-width*0.2}
            height={300}
          />
        </CardContent>
      </Card>
      <Card className="overflow-x-auto min-w-96 mt-5 shadow-sm hover:shadow-lg transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-left">Premiums and Risk</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            xAxis={[{ scaleType: "band", data: xLabels }]}
            series={[
              { data: premiumIncomeData, label: "Premuim Income",color:"#4CAF50  " },
             
              { data: riskExposure, label: " Risk Exposure",color:"#FA7864 " },
              { data: potentialRiskExposure, label: "Potential Risk Exposure",color:"#FEDE5C " },
            ]}
            // width={500}
            height={300}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default AssuranceDashboard;

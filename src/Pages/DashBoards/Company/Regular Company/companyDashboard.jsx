import React, { useEffect, useState } from "react";
import DashboardCard from "../../../../components/dashboardCard";
import {
  CreditCardIcon,
  LineChart,
  ShoppingCart,
  UsersIcon,
} from "lucide-react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import {
  countEmployees,
  getActifPlansCompany,
  getEnrolledEmployeesPlan,
} from "../../../../assets/Apis/assets";
import PieChartt from "../../../../components/ui/PieChart";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { BarChart } from "@mui/x-charts";


function CompanyDashboard() {
  const [totalEmployees, setTotalEmployees] = useState();
  const [actifPlans, setActifPlans] = useState();
  const [enrolledEmployees, setEnrolledEmployees] = useState();
  const TOKEN = localStorage.getItem("token");
  

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);


  const fetchEmployeesCount = async () => {
    const response = await countEmployees(TOKEN);
    if (response) setTotalEmployees(response);
  };

  const fetchEnrolledEmployees = async () => {
    const response = await getEnrolledEmployeesPlan(TOKEN);
    if (response || response === 0) setEnrolledEmployees(response);
  };

  const fetchActifPlans = async () => {
    const response = await getActifPlansCompany(TOKEN);
    if (response || response === 0) setActifPlans(response);
  };

  useEffect(() => {
    fetchEmployeesCount();
    fetchEnrolledEmployees();
    fetchActifPlans();
  }, []);
const data=[
  { value: enrolledEmployees, label: "Employees \n with Actif \plan", },
  { value: totalEmployees - enrolledEmployees, label: "Employees \n with no \n Actif Plan" },
]


const dataBars = [
  { plan: 'Plan A', expenses: 12000, covered: 15000 },
  { plan: 'Plan B', expenses: 30000, covered: 25000 },
  { plan: 'Plan C', expenses: 40000, covered: 35000 }
];

  return (
    <>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard
        title="All Employees"
        number={totalEmployees}
        subNumber="+11.1% from last year"
      >
        <UsersIcon className="w-4 h-4 text-darkblue" />
      </DashboardCard>

      <DashboardCard
        title="Actif Plans"
        number={actifPlans}
        //   subNumber='+180.1% from last year'
      >
        <CreditCardIcon className="w-4 h-4 text-darkblue" />
      </DashboardCard>

      <DashboardCard
        title="Enrolled Employees"
        number={enrolledEmployees}
        subNumber="+180.1% from last year"
      >
        <UsersIcon className="w-4 h-4 text-darkblue" />
      </DashboardCard>
      </div>
      <div className="space-y-4">

      <Card className="overflow-x-auto min-w-96  shadow-sm hover:shadow-lg transition-all duration-500">
        <BarChart
  xAxis={[{ scaleType: 'band', data: ['Premuim Plan', 'Safa Plus Plan', 'Tounsi Elite Plan'] }]}
  series={[
    { dataKey: 'expenses', label: 'Expenses',color:"#FF5733 " },
    { dataKey: 'covered', label: 'Covered',color:"#33FFA8 " },
  ]}
  dataset={dataBars}
  width={width>800?width/2:width}
  height={300}
/>
</Card>
      <Card className="overflow-x-auto min-w-96  shadow-sm hover:shadow-lg transition-all duration-500" > 
        <CardHeader></CardHeader>
        <CardContent>
        <PieChartt data={data}/>
        </CardContent>
        </Card>

        </div>
      
        
          
    
      {/* <Card className="drop-shadow">
        <CardHeader>Plan</CardHeader>
        <CardContent>
          <Gauge
            height={100}
            value={40}
            startAngle={-100}
            endAngle={100}
            width={200}
            valueMax={50}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 20,
                transform: "translate(0px, 0px)",
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#272643",
                borderWidth: 10,
              },
            }}
            text={({ value }) => `${value} / ${50}`}
          />
        </CardContent>
      </Card> */}
    
    </>
  );
}

export default CompanyDashboard;

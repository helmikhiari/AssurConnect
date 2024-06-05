import { useEffect, useState, useRef } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import {
  addEmpPlan,
  getOwnedPlanDetails,
} from "../../../../assets/Apis/assets";
import CustomLoading from "../../../../components/customLoading";

export default function ManagePlan() {
  const location = useLocation();
  const TOKEN = localStorage.getItem("token");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [enrolledEmployees, setEnrolledEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => setSearch(e.target.value);

  const runOnce = useRef(true);
  const [plan, setPlan] = useState({
    name: location.state.title,
    coverage: location.state.title,
    price: location.state.price,
    maxEmployees: location.state.numberOfUsers,
    currentEmployees: location.state.currentNumberOfUsers,
  });
  const [disabled, setDisabled] = useState(
    plan.maxEmployees === plan.currentEmployees
  );
  const addEmpToPlan = async (empID) => {
    const response = await addEmpPlan(TOKEN, empID, location.state.id);
    if (response) {
      await fetchData();
      setPlan((prevPlan) => ({
        ...prevPlan,
        currentEmployees: prevPlan.currentEmployees + 1,
      }));
      setDisabled(plan.maxEmployees === plan.currentEmployees);
    }
  };

  const fetchData = async () => {
    const response = await getOwnedPlanDetails(TOKEN, location.state.id, null);
    if (response) {
      setEmployees(response.employees);
      setEnrolledEmployees(response.planUsers);

      console.info(response);
    }
  };

  useEffect(() => {
    if (runOnce.current) {
      fetchData();
      runOnce.current = false;
    }
  }, []);

  const searchEmployeesByName = () => {
    return employees.filter((employee) =>
      `${employee.empFirstName} ${employee.empLastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  };

  const EmpTable = () => {
    const [filtredEmp, setFiltredEmp] = useState(employees);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      const results = searchEmployeesByName();
      setFiltredEmp(results);
      setLoading(false);
    }, [search]);

    return (
      <div className="bg-white shadow-lg rounded-2xl ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-left">Email</TableHead>
              <TableHead className="text-right pr-12">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <CustomLoading />
                </TableCell>
              </TableRow>
            ) : (
              filtredEmp.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell className="capitalize flex flex-row items-center gap-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={employee.empPicture} />
                      <AvatarFallback className="uppercase bg-darkblue text-white">
                        {employee.empFirstName[0] + employee.empLastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {employee.empFirstName} {employee.empLastName}
                  </TableCell>
                  <TableCell className="text-left">
                    {employee.empEmail}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row justify-end w-full pr-4">
                      <Button
                        className="bg-darkblue"
                        onClick={() => addEmpToPlan(employee.empID)}
                        disabled={disabled}
                      >
                        Add
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  const EnrEmpTable = ({ enrEmp }) => {
    return (
      <div className="bg-white shadow-lg rounded-2xl ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrEmp.map((employee, index) => (
              <TableRow key={index}>
                <TableCell className="capitalize flex flex-row items-center gap-2">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.planUserPicture} />
                    <AvatarFallback className="uppercase bg-darkblue text-white">
                      {employee.planUserFirstName[0] +
                        employee.planUserLastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {employee.planUserFirstName} {employee.planUserLastName}
                </TableCell>
                <TableCell>{employee.planUserEmail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  // const handleEmployeeSelect = (employeeId) => {
  //   if (selectedEmployees.includes(employeeId)) {
  //     setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
  //   } else {
  //     setSelectedEmployees([...selectedEmployees, employeeId]);
  //   }
  // };
  // const handleAddToPlan = () => {
  //   console.log(
  //     "Adding the following employees to the plan:",
  //     selectedEmployees
  //   );
  //   setEnrolledEmployees([
  //     ...enrolledEmployees,
  //     ...selectedEmployees.map((id) => employees.find((e) => e.id === id)),
  //   ]);
  //   setPlan({
  //     ...plan,
  //     currentEmployees: plan.currentEmployees + selectedEmployees.length,
  //   });
  //   setSelectedEmployees([]);
  // };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 p-6 md:p-10 text-left">
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Manage Medical Plan</h1>
          <p className="text-gray-500">
            Select the employees to be added to the medical plan.
          </p>
          <Input
            type="search"
            placeholder="Search employees by name"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <EmpTable />

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Enrolled Employees</h2>
          <div className="border rounded-lg overflow-hidden">
            <EnrEmpTable enrEmp={enrolledEmployees} />
          </div>
        </div>
      </div>
      <div className="bg-gray-700 rounded-lg p-6 md:p-8 text-white">
        <h2 className="text-xl font-bold mb-4">Current Medical Plan</h2>
        <div className="space-y-2">
          <div>
            <span className="font-medium">Plan Name:</span> {plan.name}
          </div>
          <div>
            <span className="font-medium">Coverage:</span> {plan.coverage}
          </div>
          <div>
            <span className="font-medium">Cost:</span> {plan.cost}
          </div>
          <div>
            <span className="font-medium">Current Employees:</span>{" "}
            {plan.currentEmployees}
          </div>
          <div>
            <span className="font-medium">Remaining Free Space:</span>{" "}
            {plan.maxEmployees - plan.currentEmployees}
          </div>
        </div>
      </div>
    </div>
  );
}

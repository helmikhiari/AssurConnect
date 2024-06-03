import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function ManagePlan() {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [enrolledEmployees, setEnrolledEmployees] = useState([]);
  const [plan, setPlan] = useState({
    name: "Premium Medical Plan",
    coverage: "100% coverage for all medical expenses",
    cost: "$500 per employee per month",
    maxEmployees: 100,
    currentEmployees: 50,
  });
  const employees = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Michael Johnson", email: "michael@example.com" },
    { id: 4, name: "Emily Davis", email: "emily@example.com" },
    { id: 5, name: "David Wilson", email: "david@example.com" },
    { id: 6, name: "Sarah Lee", email: "sarah@example.com" },
    { id: 7, name: "Tom Brown", email: "tom@example.com" },
    { id: 8, name: "Olivia Taylor", email: "olivia@example.com" },
  ];

  const EmpTable = ({ enrEmp }) => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrEmp.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  const handleEmployeeSelect = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };
  const handleAddToPlan = () => {
    console.log(
      "Adding the following employees to the plan:",
      selectedEmployees
    );
    setEnrolledEmployees([
      ...enrolledEmployees,
      ...selectedEmployees.map((id) => employees.find((e) => e.id === id)),
    ]);
    setPlan({
      ...plan,
      currentEmployees: plan.currentEmployees + selectedEmployees.length,
    });
    setSelectedEmployees([]);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 p-6 md:p-10 text-left">
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Manage Medical Plan</h1>
          <p className="text-gray-500">
            Select the employees to be added to the medical plan.
          </p>
          <Input type="search" placeholder="Search employees..." />
        </div>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[32px]">
                  <Checkbox
                    id="select-all"
                    checked={selectedEmployees.length === employees.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedEmployees(employees.map((e) => e.id));
                      } else {
                        setSelectedEmployees([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Checkbox
                      id={`employee-${employee.id}`}
                      checked={selectedEmployees.includes(employee.id)}
                      onCheckedChange={() => handleEmployeeSelect(employee.id)}
                    />
                  </TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleAddToPlan}
            disabled={selectedEmployees.length === 0}
          >
            Add to Plan
          </Button>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Enrolled Employees</h2>
          <div className="border rounded-lg overflow-hidden">
            <EmpTable enrEmp={enrolledEmployees} />
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

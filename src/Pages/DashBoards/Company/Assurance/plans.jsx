import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/themes/dist/cjs/index.js";
import { SearchIcon } from "../../../../assets/icons/icons";
import { FilterIcon } from "lucide-react";
export default function Plans() {
  return (
    <main className="flex-1 p-4 md:p-6 grid gap-4 md:gap-6">
      <div className="flex items-center gap-4">
        <form className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
          <Input
            className="pl-10 w-full"
            placeholder="Search insurance plans..."
            type="search"
          />
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2" variant="outline">
              <FilterIcon className="w-5 h-5" />
              <span>Filter</span>
              <ChevronDownIcon className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem>
              <div className="flex items-center justify-between">
                <span>Active</span>
                <Checkbox defaultChecked />
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              <div className="flex items-center justify-between">
                <span>Inactive</span>
                <Checkbox />
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem>
              <div className="flex items-center justify-between">
                <span>Individual</span>
                <Checkbox defaultChecked />
              </div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>
              <div className="flex items-center justify-between">
                <span>Group</span>
                <Checkbox />
              </div>
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Health Plan</CardTitle>
            <CardDescription>
              Our most affordable health insurance plan for individuals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Members Enrolled
              </span>
              <span className="text-2xl font-bold">1,234</span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline">View Details</Button>
            <Button>Manage Plan</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Premium Health Plan</CardTitle>
            <CardDescription>
              Our most comprehensive health insurance plan for individuals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Members Enrolled
              </span>
              <span className="text-2xl font-bold">789</span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline">View Details</Button>
            <Button>Manage Plan</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Group Health Plan</CardTitle>
            <CardDescription>
              Our group health insurance plan for businesses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Members Enrolled
              </span>
              <span className="text-2xl font-bold">2,345</span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline">View Details</Button>
            <Button>Manage Plan</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dental Plan</CardTitle>
            <CardDescription>
              Our dental insurance plan for individuals and families.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Members Enrolled
              </span>
              <span className="text-2xl font-bold">456</span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline">View Details</Button>
            <Button>Manage Plan</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vision Plan</CardTitle>
            <CardDescription>
              Our vision insurance plan for individuals and families.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Members Enrolled
              </span>
              <span className="text-2xl font-bold">321</span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline">View Details</Button>
            <Button>Manage Plan</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Life Insurance Plan</CardTitle>
            <CardDescription>
              Our life insurance plan for individuals and families.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Members Enrolled
              </span>
              <span className="text-2xl font-bold">678</span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline">View Details</Button>
            <Button>Manage Plan</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

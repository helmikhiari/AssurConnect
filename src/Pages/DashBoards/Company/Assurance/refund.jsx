import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
export default function RefundRequests() {
  const [activeTab, setActiveTab] = useState("All");
  const onTabChange = (value) => setActiveTab(value);
  const [loadingCount, setLoadingCount] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [refundsCount, setRefundsCount] = useState(180);
  const handlePrev = () => setCurrentPage((prev) => prev - 1);
  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const Status = ({status})=>
  { let color="#E4D00A";
    switch(status)
    { 
      case "Approved":color="green";break
      case "Rejected":color="red";break;
    }
    return (
      <Badge
        className="text-white "
        style={{
          backgroundColor: color
        }}
      >
        {status}
      </Badge>
    
    );
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <Tabs
        value={activeTab}
        className="flex w-auto "
        onValueChange={onTabChange}
      >
        <TabsList className="flex  w-full px-8 py-6 items-center">
          <TabsTrigger
            value="All"
            className="data-[state=active]:text-darkblue"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="Approved"
            className="data-[state=active]:text-green-500"
          >
            Approved
          </TabsTrigger>
          <TabsTrigger
            value="Waiting"
            className="data-[state=active]:text-yellow-500"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="Rejected"
            className="data-[state=active]:text-red-500"
          >
            Rejected
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Card className="w-full drop-shadow">
        <CardHeader>
          <CardTitle>Fund Requests</CardTitle>
          <CardDescription>
            View and manage fund requests for your insurance plans.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-auto text-left">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-300  ">
                  <TableHead>Plan</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Max Refund Amount</TableHead>

                  <TableHead>Ceiling</TableHead>
                  <TableHead>Requested On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Tounsi Elite Plan</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>500TND</TableCell>

                  <TableCell>300/450</TableCell>
                  <TableCell>2023-06-01</TableCell>
                  <TableCell> <Status status="Pending"/></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <CheckIcon className="h-4 w-4" />
                      <span className="sr-only">Approve</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <XIcon className="h-4 w-4" />
                      <span className="sr-only">Reject</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tounsi Elite Plan</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>200TND</TableCell>

                  <TableCell>300/450</TableCell>
                  <TableCell>2023-05-15</TableCell>
                  <TableCell> <Status status="Approved"/></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <DownloadIcon className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Amana Luxe Plan</TableCell>
                  <TableCell>Michael Johnson</TableCell>
                  <TableCell>300TND</TableCell>

                  <TableCell>300/450</TableCell>
                  <TableCell>2023-04-20</TableCell>
                  <TableCell> <Status status="Rejected"/></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <RefreshCcwIcon className="h-4 w-4" />
                      <span className="sr-only">Resubmit</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Safa Platine Plan</TableCell>
                  <TableCell>Michael Johnson</TableCell>
                  <TableCell>500TND</TableCell>

                  <TableCell>300/450</TableCell>
                  <TableCell>2023-04-20</TableCell>
                  <TableCell> <Status status="Rejected"/></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <RefreshCcwIcon className="h-4 w-4" />
                      <span className="sr-only">Resubmit</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Safa Platine Plus</TableCell>
                  <TableCell>Sarah Lee</TableCell>
                  <TableCell>100TND</TableCell>

                  <TableCell>300/450</TableCell>
                  <TableCell>2023-06-05</TableCell>
                  <TableCell> <Status status="Pending"/></TableCell>
                 
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <CheckIcon className="h-4 w-4" />
                      <span className="sr-only">Approve</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <XIcon className="h-4 w-4" />
                      <span className="sr-only">Reject</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <PaginationContent className="flex  justify-between px-[80px] bg-gray-50 rounded-b-xl">
              <p className="flex justify-self-end cursor-default font-sm text-sm text-right">
                {!loadingCount ? (
                  `${Math.min(currentPage * 5 + 1, refundsCount)}-${Math.min(
                    (currentPage + 1) * 5,
                    refundsCount
                  )} of ${refundsCount}`
                ) : (
                  <CustomLoading className="w-7 h-7" />
                )}
              </p>
              <div className="flex self-center gap-10">
                {currentPage != 0 && (
                  <PaginationItem>
                    <PaginationPrevious
                      className="cursor-pointer"
                      onClick={handlePrev}
                    />
                  </PaginationItem>
                )}

                {Math.min((currentPage + 1) * 5, refundsCount) !=
                  refundsCount && (
                  <PaginationItem
                    className="cursor-pointer"
                    onClick={handleNext}
                  >
                    <PaginationNext />
                  </PaginationItem>
                )}
              </div>
            </PaginationContent>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function RefreshCcwIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

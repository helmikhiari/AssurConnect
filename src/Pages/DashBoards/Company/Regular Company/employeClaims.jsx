  import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DotIcon, EyeIcon } from "lucide-react"

export default function EmployeClaim() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 py-6 px-4 md:px-6 dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <img src="/placeholder.svg" alt="Employee Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold">John Doe</h1>
              <p className="text-gray-500 dark:text-gray-400">Software Engineer</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-gray-500 dark:text-gray-400">Employee ID: 12345</p>
              <p className="text-gray-500 dark:text-gray-400">Joined: June 1, 2020</p>
            </div>
            <Button variant="outline" size="icon">
              <DotIcon className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="mb-4 text-2xl font-semibold">Claims</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>June 1, 2023</TableCell>
                  <TableCell>Medical</TableCell>
                  <TableCell>$500.00</TableCell>
                  <TableCell>
                    <Badge variant="success">Approved</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon">
                      <EyeIcon className="h-5 w-5" />
                      <span className="sr-only">View claim</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>May 15, 2023</TableCell>
                  <TableCell>Travel</TableCell>
                  <TableCell>$250.00</TableCell>
                  <TableCell>
                    <Badge variant="warning">Pending</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon">
                      <EyeIcon className="h-5 w-5" />
                      <span className="sr-only">View claim</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>April 20, 2023</TableCell>
                  <TableCell>Dental</TableCell>
                  <TableCell>$100.00</TableCell>
                  <TableCell>
                    <Badge variant="danger">Rejected</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon">
                      <EyeIcon className="h-5 w-5" />
                      <span className="sr-only">View claim</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>March 1, 2023</TableCell>
                  <TableCell>Wellness</TableCell>
                  <TableCell>$75.00</TableCell>
                  <TableCell>
                    <Badge variant="success">Approved</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon">
                      <EyeIcon className="h-5 w-5" />
                      <span className="sr-only">View claim</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  )
}
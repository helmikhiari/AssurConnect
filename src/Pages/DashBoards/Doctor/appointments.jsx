import React, { useState, useEffect } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  TableFooter,
} from "@/components/ui/table";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Appointments() {
  const AppBadge = ({ color, content }) => {
    let a = "";
    if (color)
      a = "bg-" + color + "-400 hover:bg-" + color + "-500 cursor-default";
    return <Badge className={a}>{content}</Badge>;
  };

  return (
    <Card className=" drop-shadow mx-5 flex flex-col h-full  justify-between rounded-[25px]">
      <Table className="flex flex-col w-full text-center ">
        <TableHeader >
          <TableRow className="grid grid-cols-3 bg-gray-200 rounded-tr-[25px] rounded-tl-[25px] px-10">
            
            <TableHead className="text-left place-content-center">
              <p className="pl-5 text-darkblue">Patient</p>
            </TableHead>
            <TableHead className="text-darkblue place-content-center text-center">Date</TableHead>
            <TableHead className="text-center text-darkblue place-content-center text-right">Status</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="grid grid-cols-3 px-5">
            <TableCell>
              <div className="flex items-center gap-2">
                <img
                  alt="Patient Avatar"
                  className="rounded-full"
                  height="32"
                  src={"prescriptionImg"}
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <div>
                  <div className="font-medium">John Doe</div>
                </div>
              </div>
            </TableCell>

            <TableCell className="text-center">May 22, 2023 at 13:00</TableCell>
            <TableCell className="text-right">
              <AppBadge color="red" content="Rejected" />
            </TableCell>
          </TableRow>
          <TableRow className="grid grid-cols-3 px-5">
            <TableCell>
              <div className="flex items-center gap-2">
                <img
                  alt="Patient Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <div>
                  <div className="font-medium">Jane Smith</div>
                </div>
              </div>
            </TableCell>

            <TableCell className="text-center">June 1, 2023 at 11:00</TableCell>
            <TableCell className="text-right">
              <AppBadge color="yellow" content="Pending" />
            </TableCell>
          </TableRow>
          <TableRow className="flex grow justify-between">
            <TableCell >
              <div className="flex items-center gap-2">
                <img
                  alt="Patient Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <div>
                  <div className="font-medium">Michael Johnson</div>
                </div>
              </div>
            </TableCell>

            <TableCell >June 15, 2023 at 10:00</TableCell>
            <TableCell >
              <AppBadge color="green" content="Confirmed" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="cursor-pointer ">
        <PaginationContent className="flex justify-between px-[80px] bg-gray-200  rounded-bl-[25px] rounded-br-[25px]">
          <p className="flex  justify-self-end cursor-default font-sm text-sm text-right">
            1-8 of 15
          </p>
          <div className="flex self-center gap-10">
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </div>
        </PaginationContent>
      </div>
    </Card>
  );
}

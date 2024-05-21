import React from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
export default function DashboardCard({ children, number, title, subNumber }) {
  return (
    <Card className="drop-shadow ">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        {children}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{number}</div>
        {subNumber && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {subNumber}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

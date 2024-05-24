import React from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardCard({ children, number, title, subNumber }) {

  return (
    
    <Card className="drop-shadow ">
        {number!="+undefined"?<><CardHeader className="flex flex-row items-center justify-between pb-2">
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
      </CardContent></>:
        <div className="space-y-4 p-4">
        
        <Skeleton className="h-8 w-3/4" />
        
        <div className="flex justify-center">
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>}
    </Card>
  );
}

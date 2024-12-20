import React from 'react'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { StarIcon } from '../assets/icons/icons'
import { Skeleton } from "@/components/ui/skeleton"
export default function RatingCard({title,rating,numberOfReviews}) {

    
  return (
    <Card className="sm:h-[140px] h-[120px] drop-shadow">
    {rating&&numberOfReviews?<><CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-md font-medium">{title}</CardTitle>
      <StarIcon className="w-4 h-4 text-darkblue"/>
    </CardHeader>
    <CardContent>
      <div className="flex justify-center items-center gap-2">
        <div className="text-2xl font-bold">{rating}</div>
        <div className="flex items-center gap-1">
          <StarIcon className="w-5 h-5 fill-yellow-500 text-yellow-500" />
          <StarIcon className="w-5 h-5 fill-yellow-500 text-yellow-500" />
          <StarIcon className="w-5 h-5 fill-yellow-500 text-yellow-500" />
          <StarIcon className="w-5 h-5 fill-yellow-500 text-yellow-500" />
          <StarIcon className="w-5 h-5 fill-yellow-500 text-yellow-500" />
        </div>
      
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">Based on {numberOfReviews} reviews</div>
    </CardContent></>:
    <div className="space-y-4 p-4">
        
    <Skeleton className="h-8 w-3/4" />
    
    <div className="flex justify-center">
      <Skeleton className="h-6 w-1/2" />
    </div>
  </div>}
  </Card>
  )
}

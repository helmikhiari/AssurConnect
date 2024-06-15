import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";
import { buyPlanCompany, getAssuranceDetails } from "../../../../assets/Apis/assets";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Loading from "../../../../components/loading";
export default function AssuranceDetails() {
  const {state}=useLocation();
  const [loading,setLoading]=useState(true);
  const [assuranceData,setAssuranceData]=useState();
  const [planData,setPlanData]=useState();
  const token=localStorage.getItem('token');
  const navigate=useNavigate();
  const fetchData=async(id)=>
  { let aux;
    id? aux=id:aux=state.id
    const response=await getAssuranceDetails(token,aux,state.assuranceID);
    if (response)
      { 
        setAssuranceData(response.assurance);
        setPlanData(response.plan);
        
      }
    setLoading(false);
  }

  useEffect(()=>{
    fetchData();
  },[])

  const handleChange=(id)=>
    {
      setLoading(true);
      fetchData(id);
    }

    const buyPlan=async()=>
    {
      const response=await buyPlanCompany(token,planData._id)
      if (response)
        { 
          navigate('../plans');
        }  
    }

  return (
    !loading?
    <main className="flex flex-1 flex-col gap-6 p-6 md:gap-10 md:p-10">
      <Card className="rounded-xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 text-darkblue cursor-normal hover:h-[100px] hover:w-[100px] drop-shadow transition-all duration-500">
                  <AvatarImage src={assuranceData?.logo} />
                  <AvatarFallback className="bg-darkblue text-white 2xl uppercase">
                    {assuranceData?.name[0]}
                    {assuranceData?.name[1]}
                  </AvatarFallback>
                </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{assuranceData?.name} Insurance</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {assuranceData?.bio}
                </p>
              </div>
            </div>
          
          </div>
        </CardHeader>
        <CardContent className="text-left">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">About {assuranceData?.name} Insurance</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {assuranceData?.description}.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Company Details</h3>
              <div className="grid gap-2">
                <div className="flex items-center justify-between capitalize">
                  <span>Headquarters:</span>
                  <span>{assuranceData?.address}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Founded:</span>
                  <span>{assuranceData?.founded}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-xl shadow-lg text-left">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{planData?.title} Plan</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {planData?.bio}
              </p>
            </div>
            <Button onClick={buyPlan}>
              Buy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <h3 className="text-lg font-semibold">Plan Details</h3>
              <div className="grid gap-2 text-gray-500 dark:text-gray-400">
              
                <div className="flex items-center justify-between">
                  <span>Price</span>
                  <span>TND {planData?.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Coverage</span>
                  <span>TND {planData?.cover}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Coverage Amount</span>
                  <span>TND {planData?.cover*planData?.numberOfUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Number Of Users</span>
                  <span>{planData?.numberOfUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span >Duration</span>
                  <span>{planData?.duration} Days</span>
                </div>

                <div className="flex justify-between flex-col">
                  <span className="text-darkblue font-medium" >Coverage Details</span>
                  <span>{planData?.coverageDetails}</span>
                </div>
                <div className="flex justify-between flex-col">
                  <span className="text-darkblue font-medium" >Exclusions</span>
                  <span>{planData?.exclusions}</span>
                </div>
                <div className="flex items-start justify-between flex-col">
                  <span  className="text-darkblue font-medium">Description:</span>
                  <span>{planData?.description}</span>
                </div>
              </div>
          
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold">Other Plans</h3>
              <div className="grid gap-4">
               { assuranceData?.plans.map((plan,index)=>
              <div className="grid grid-cols-[1fr_auto] items-center gap-4" key={index}>
              <div>
                <h4 className="font-semibold">{plan.title} Plan</h4>
                <p className="text-gray-500 dark:text-gray-400">
                  {plan.bio}
                </p>
              </div>
              <Button size="sm" variant="outline" onClick={()=>handleChange(plan._id)}>
                Select
              </Button>
            </div>)}
                
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
    :
    <Loading/>
  );
}

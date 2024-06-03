import React, { useEffect, useState } from "react";
import { TabsTrigger, TabsList, Tabs, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator"
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { SearchIcon } from "../../../../assets/icons/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { isValidPrice } from "../../../../assets/functions";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { classNames } from "classnames";
import { getPlansByPageandSearch } from "../../../../assets/Apis/assets";
function Plans() {
  const navigate = useNavigate();

  const OwnedPlan = () => {
    const handleNavigate = () => {navigate('/dashboard/plans/manageplan')};
    return (
      <NavLink className="group" onClick={handleNavigate}>
        <Card className=" shadow-sm hover:shadow-lg transition-shadow duration-900 bg-slate-100">
          <CardContent className="flex flex-col justify-between h-full min-h-[220px] py-5">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 flex flex-row justify-between items-center">
                <Avatar className="h-12 w-12 text-darkblue">
                  <AvatarImage src="" />

                  <AvatarFallback></AvatarFallback>
                </Avatar>
                Basic Health Plan
              </h3>
              <p className="mt-2 text-gray-500 text-left ">
                Covers essential medical services with a low deductible.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Button
                className="group-hover:bg-darkblue group-hover:text-white"
                size="sm"
                variant="outline"
                
              >
                Manage Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </NavLink>
    );
  };

  const Plan = ({plan}) => {
    const handleNavigate = () => {
      navigate("/dashboard/plans/assuranceDetails");
    };
    return (
      <NavLink className="group" onClick={handleNavigate}>
        <Card className=" shadow-sm hover:shadow-lg transition-shadow duration-500 bg-slate-100">
          <CardContent className="flex flex-col justify-between h-full min-h-[220px] py-5 flex-wrap">
            <div>
              <h3 className="text-2xl font-semibold text-black flex flex-row justify-between items-center">
                <Avatar className="h-12 w-12 text-darkblue">
                  <AvatarImage src={plan?.assuranceLogo} />
                  <AvatarFallback className="bg-darkblue text-white text-sm">{plan?.assuranceName[0]}{plan?.assuranceName[1]}</AvatarFallback>
                </Avatar>
                {plan?.title}
              </h3>
              <p className="mt-2 text-gray-900 text-left ">
                {plan?.bio}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold text-cyan-500 ">
                $99/mo
              </span>
              <Button
                className="group-hover:bg-darkblue group-hover:text-white"
                size="sm"
                variant="outline"
              >
                View Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </NavLink>
    );
  };

  const MyPlans = () => {
    return (
      <div>
        <header className=" rounded-xl ">
          <div className=" mx-5 flex items-center justify-start ">
            <div className="flex justify-end relative w-full max-w-md py-5">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 " />
              <Input
                className="w-full rounded-xl bg-white mr-5 px-12 py-2 text-gray-900 shadow-sm focus:border-primary focus:ring-primary "
                placeholder="Search plans by name,by assurance company name"
                type="search"
              />
            </div>
            <Button className="bg-white text-darkblue hover:text-darkblue hover:bg-white">Search</Button>
          </div>
        </header>

        <Card className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4  overflow-y-auto max-h-screen shadow">
          <OwnedPlan />
          <OwnedPlan />
          <OwnedPlan />
          <OwnedPlan />
          <OwnedPlan />
          <OwnedPlan />
          <OwnedPlan />
          <OwnedPlan />
          <OwnedPlan />
          <OwnedPlan />
        </Card>
      </div>
    );
  };

  const BrowsePlans = () => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [data,setData]=useState([]);
    const [page,setPage]=useState(0);
    const [search,setSearch]=useState("");
    const [fetchMore,setFetchMore]=useState(true);
    const [loading, setLoading] = useState(false);
    const handleSearchChange = (e) => setSearch(e.target.value);

    const handleMinChange = (e) => {
      if (isValidPrice(e.target.value) || e.target.value == "") {
        {
          setMin(e.target.value);
          setMax(Math.max(e.target.value, max));
        }
      }
    };

    const handleMaxChange = (e) => {
      if (isValidPrice(e.target.value) || e.target.value == "")
        setMax(e.target.value);
    };  

    const handleSearch=(e)=>
      {
        e.preventDefaut();
        fetchPlans();
      }

    const fetchPlans=async()=>
      { setLoading(true)
        const response=await getPlansByPageandSearch(page,search)
        if (response)
          { 
            setData((prev)=>[...prev,...response]);
            setPage((prev)=>prev+1)
          }
          else
          {
            setFetchMore(false);
          }
          setLoading(false)
      }

    useEffect(()=>{
      fetchPlans();
      
    },[])
    
    useEffect(()=>{
    console.log(data[0]?.assuranceName)
      
    },[data])
    

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [])

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        fetchPlans()
      }
    };

    return (
      <Card className="p-0">
        <form className="rounded bg-[#154c79] " onSubmit={handleSearch}>
          <div className=" mx-5 flex items-center justify-start ">
            <div className="flex justify-end relative w-full max-w-md py-5">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 " />
              <Input
                className="w-full rounded-xl bg-white mr-5 px-12 py-2 text-gray-900 shadow-sm focus:border-primary focus:ring-primary "
                placeholder="Search plans by name,by assurance company name"
                type="search"
                onChange={handleSearchChange}
                value={search}
              />
            </div>
            <Button className="bg-darkblue hover:bg-black" type='submit'>Search</Button>
          </div>
        </form>
        <main className="bg-white-500 shadow-lg ">
          <div className="container  grid md:grid-cols-[170px_1fr] gap-10 items-start py-5">
            <div className="flex flex-col gap-4 items-start  overflow-y-auto max-h-[500px] w-full">
              <Accordion className="w-full" collapsible type="single">
                <AccordionItem value="coverage">
                  <AccordionTrigger className="text-base font-semibold">
                    Coverage
                  </AccordionTrigger>
                  <AccordionContent className="grid grid-cols-1 gap-2 pt-1">
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <Label className="font-normal" htmlFor="min-cov">
                        Min
                      </Label>
                      <Input
                        type="number"
                        id="min-cov"
                        className="w-[100px] h-7"
                        value={min}
                        onChange={handleMinChange}
                      />
                    </div>
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <Label htmlFor="max-cov" className="font-normal">
                        Max
                      </Label>
                      <Input
                        type="number"
                        id="max-cov"
                        className="w-[100px] h-7"
                        value={max}
                        onChange={handleMaxChange}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger className="text-base font-semibold">
                    Price
                  </AccordionTrigger>
                  <AccordionContent className="grid grid-cols-1 gap-2 pt-1">
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <Label htmlFor="min-price" className="font-normal">
                        Min
                      </Label>
                      <Input
                        type="number"
                        id="min-price"
                        className="w-[100px] h-7"
                        value={min}
                        onChange={handleMinChange}
                      />
                    </div>
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <Label className="font-normal" htmlFor="max-price">
                        Max
                      </Label>
                      <Input
                        type="number"
                        id="max-price"
                        className="w-[100px] h-7"
                        value={max}
                        onChange={handleMaxChange}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <Button className="mt-5  bg-gradient-to-br from-blue-50 via-blue-100 to-white hover:from-blue-200 hover:via-blue-200 hover:to-white text-black w-full">
                  Apply
                </Button>
              </Accordion>
            </div>
            <div className="grid grid-cols-1 gap-6  lg:grid-cols-3 overflow-y-auto max-h-screen pr-2">
             {
              data.map((p)=><Plan plan={p}/>)
             }
          
            </div>
          </div>
        </main>
      </Card>
    );
  };

  return (
    <div>
      <div className="flex-1 transition-all duration-500 ease-in-out">
        <Tabs
          className=" items-center gap-0 transition-all duration-500 ease-in-out"
          defaultValue="my-plans"
        >
          <TabsList className="gap-0 flex w-min">
            <TabsTrigger
              className="transition-all duration-500 ease-in-out data-[state=active]:bg-darkblue text-darkblue data-[state=active]:text-white"
              value="my-plans"
            >
              My Plans
            </TabsTrigger>
            <TabsTrigger
              className="transition-all duration-500 ease-in-out data-[state=active]:bg-darkblue text-darkblue data-[state=active]:text-white"
              value="browse-plans"
            >
              Browse Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse-plans">
            <BrowsePlans />
          </TabsContent>
          <TabsContent value="my-plans">
            <MyPlans />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Plans;
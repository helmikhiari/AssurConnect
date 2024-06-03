import React from "react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
export default function AssuranceDetails() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-6 md:gap-10 md:p-10">
      <Card className="rounded-xl shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                alt="Acme Insurance"
                className="rounded-full"
                height="48"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "48/48",
                  objectFit: "cover",
                }}
                width="48"
              />
              <div>
                <h2 className="text-xl font-semibold">Acme Insurance</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Trusted provider of assurance plans since 1985.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                Visit Website
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-left">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">About Acme Insurance</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Acme Insurance is a leading provider of assurance plans in the
                United States. Founded in 1985, we have a long history of
                providing reliable and affordable coverage to individuals and
                families. Our mission is to help our customers protect their
                financial future and achieve peace of mind.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Company Details</h3>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>Headquarters:</span>
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Founded:</span>
                  <span>1985</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Employees:</span>
                  <span>500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Customers:</span>
                  <span>1 million+</span>
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
              <h2 className="text-xl font-semibold">Premium Plan</h2>
              <p className="text-gray-500 dark:text-gray-400">
                $200/month, $0 deductible, $250,000 coverage
              </p>
            </div>
            <Button size="sm" variant="outline">
              Select
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <h3 className="text-lg font-semibold">Plan Details</h3>
              <div className="grid gap-2 text-gray-500 dark:text-gray-400">
                <div className="flex items-center justify-between">
                  <span>Monthly Premium:</span>
                  <span>$200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Deductible:</span>
                  <span>$0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Coverage Amount:</span>
                  <span>$250,000</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold">Other Plans</h3>
              <div className="grid gap-4">
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>
                    <h4 className="font-semibold">Basic Plan</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      $50/month, $500 deductible, $50,000 coverage
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Select
                  </Button>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>
                    <h4 className="font-semibold">Standard Plan</h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      $100/month, $250 deductible, $100,000 coverage
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Select
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

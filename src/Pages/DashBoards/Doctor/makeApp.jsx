import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTPSlot,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTP,
} from "@/components/ui/input-otp";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function MakeApp() {
  const [patientData, setPatientData] = useState();
  const [numberOfMedicines, setNumberOfMedicines] = useState(0);
  const location = useLocation();
  const addMedicine = () => setNumberOfMedicines((prev) => prev + 1);
  useEffect(() => {
    setPatientData(location.state);
  }, []);

  const Medicine = () => {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="medicine-name">Medicine Name</Label>
          <Input id="medicine-name" placeholder="Amoxicillin" />
        </div>
        <div>
          <Label htmlFor="dosage">Dosage</Label>
          <Input id="dosage" placeholder="500mg" />
        </div>
        <div>
          <Label htmlFor="instructions">Instructions</Label>
          <Input id="instructions" placeholder="Take 2 times a day" />
        </div>
      </div>
    );
  };

  return (
    <main className="flex  mx-auto py-8 px-4 md:px-6 lg:px-8 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Appointment In Progress</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Providing care for the patient.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium">Notes</h2>
              <Textarea
                className="mt-2 h-32"
                placeholder="Enter notes about the appointment..."
              />
            </div>
            <div>
              <h2 className="text-lg font-medium">Prescription</h2>
              <div className="space-y-4">
                {Array.from({ length: numberOfMedicines }).map((_, index) => (
                  <Medicine key={index} />
                ))}

                <div className="flex justify-center">
                  <Button variant="outline" onClick={addMedicine}>
                    Add Medicine
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">Code Entry</h2>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button className="w-full" variant="destructive">
            End Appointment
          </Button>
        </div>
      </div>
    </main>
  );
}

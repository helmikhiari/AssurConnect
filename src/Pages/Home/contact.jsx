
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import aboutImg from '../../assets/images/about.png'
export default function Contact() {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex-1">
        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="mx-auto max-w-3xl space-y-8 p-6 sm:p-10">
            <div className="space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Have a question or need assistance? Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-lg">
                <img
                  alt="Contact Us"
                  className="h-full w-full object-cover"
                  height="600"
                  src={aboutImg}
                  style={{
                    aspectRatio: "600/600",
                    objectFit: "contain",
                  }}
                  width="600"
                />
              </div>
              <div className="space-y-6">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" type="text" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter your email" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter the subject" type="text" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea className="min-h-[120px]" id="message" placeholder="Enter your message" />
                  </div>
                  <div className="flex justify-center">
                    <Button className="w-full max-w-[200px]" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
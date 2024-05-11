import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-[#e6f2ff] to-[#d3e3f7] to-white">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <div className="flex flex-row justify-center mt-4 mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 m-0"></p>
            Don't have an account?
            <p
              className="font-medium text-[#272643] hover:underline dark:text-[#8da4f1] m-0 ml-1 "
              href="#"
            >
              Sign up
            </p>
          </div>
        </div>
        <form action="#" className="space-y-6" method="POST">
          <div>
            <Label htmlFor="email" className="flex justify-start mb-2">
              Email address
            </Label>
            <Input
              autoComplete="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              required
              type="email"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <p
                className="text-sm font-medium text-[#272643] hover:underline dark:text-[#8da4f1]"
                href="#"
              >
                Forgot password?
              </p>
            </div>
            <Input
              autoComplete="current-password"
              id="password"
              name="password"
              placeholder="Password"
              required
              type="password"
              className="pr-5"
            />
          </div>
          <div className="flex items-center">
            <Checkbox id="remember-me" name="remember-me" />
            <Label
              className="ml-2 block text-sm text-gray-900 dark:text-gray-400"
              htmlFor="remember-me"
            >
              Remember me
            </Label>
          </div>
          <Button
            className="w-full bg-[#272643] text-white hover:bg-[#1c1d33] dark:bg-[#8da4f1] dark:text-gray-900 dark:hover:bg-[#6c84c4]"
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

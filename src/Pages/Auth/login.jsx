import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "../../assets/Apis/assets";
import { useContext, useState, useEffect } from "react";
import { validateLogin } from "../../assets/validations";
import { userContext } from "../../Context/userContext";
import Loading from "../../components/loading";
export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { activeProfile } = useContext(userContext);
  useEffect(() => {
    if (activeProfile != null) {
      if (activeProfile.data) {
        navigate("/dashboard");
      } else {
        setLoading(false);
      }
    }
  }, [activeProfile]);

  const onSubmit = async (e) => {
    e.preventDefault()
    const validation = validateLogin(email, password);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      const response = await login(email, password);
      if (response.email || response.password) {
        setErrors(response);
      } else if (response.access) {
        localStorage.setItem("token", response.access);
        window.location.replace("/dashboard");
      }
    }
  };

  return !loading ? (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-[#e6f2ff] to-[#d3e3f7] to-white">
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <div className="flex flex-row justify-center mt-4 mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 m-0"></p>
            Don't have an account?
            <Link
              className="font-medium text-[#272643] hover:underline dark:text-[#8da4f1] m-0 ml-1 "
              href="#"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>
        <form className="space-y-6" onSubmit={onSubmit} >
          <div>
            <Label htmlFor="email" className="flex justify-start mb-2">
              Email address
            </Label>
            <Input
              autoComplete="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              onChange={changeEmail}
            />
            {errors.email && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.email}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <Link
                className="text-sm font-medium text-[#272643] hover:underline dark:text-[#8da4f1]"
                href="#"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              autoComplete="current-password"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              className="pr-5"
              onChange={changePassword}
            />
            {errors.password && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.password}
              </span>
            )}
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
      </motion.div>
    </div>
  ) : (
    <Loading />
  );
}

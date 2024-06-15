import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon, LogInIcon, UserIcon } from "lucide-react";
import adminLoginPicture from "../../assets/images/adminLogin.jpg";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import Loading from "./../../components/loading";
import { login } from "../../assets/Apis/admin";
export default function AdminLogin() {
  const { activeProfile } = useContext(userContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData,setFormData]=useState({email:"",password:""})
  const [errors,setErrors]=useState({})
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
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
    const response=await login(formData)
    console.log(response)
    if (response.email||response.password)
      setErrors(response)
    else if (response)
      {localStorage.setItem("token",response);
      navigate("/dashboard")}
  };

  return !loading ? (
    <div className="grid  grid-colsd-1 md:grid-cols-2 w-full mx-auto h-screen  bg-gradient-to-b from-white via-[#e6f2ff] to-white">
      <div className="bg-gray-100 dark:bg-gray-950 flex items-center justify-center">
        <img
          src={adminLoginPicture}
          alt="Admin Login"
          className=" w-full object-cover h-screen shadow-2xl"
        />
      </div>
      <div className="flex items-center justify-center p-0 md:p-0 h-screen shadow-2xl">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-0 flex items-center justify-center gap-2">
              <LockIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              Admin Login
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access the admin dashboard.
            </p>
          </div>
          <form className="space-y-4 mt-0" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="email">
                <div className="flex items-center justify-between ">
                  <span>Email</span>
                </div>
              </Label>
              <Input
                id="email"
                type="text"
                name="email"
                placeholder="Enter your Email"
                className="pl-2 mt-2"
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.email}
              </span>
            )}
            </div>
            <div>
              <Label htmlFor="password">
                <div className="flex items-center justify-between">
                  <span>Password</span>
                </div>
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className="pl-2 mt-2"
                onChange={handleChange}
                value={formData.password}
              />
              {errors.password && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.password}
              </span>
            )}
            </div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-darkblue"
            >
              <LogInIcon className="h-5 w-5 text-white dark:text-gray-900" />
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

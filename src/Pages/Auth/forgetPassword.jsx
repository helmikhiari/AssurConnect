import { NavLink, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  ArrowLeftIcon,
  LockIcon,
  MailBoxIcon,
  MountainIcon,
} from "../../assets/icons/icons";
import { useEffect, useRef, useState } from "react";
import {
  checkMail,
  resetPassword,
  sendOtp,
  sendOtpForgetPassword,
  verifyOtpResetPassword,
} from "../../assets/Apis/assets";
import {
  validateMail,
  validationResetPassword,
} from "../../assets/validations";
import Modal from "../../components/modal";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [currentForm, setCurrentForm] = useState(0);
  const form = { newPassword: "", confirmNewPassword: "" };
  let email = "";
  const handleNext = () => setCurrentForm((prev) => prev + 1);
  const handleBack = () => setCurrentForm((prev) => prev - 1);
  const updateEmail = (e) => (email = e.target.value);
  const redirect = () => {
    navigate("/login");
  };
  const SendOtp = () => {
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(false);
    const onSubmit = async (e) => {
      setDisabled(true);
      e.preventDefault();
      const validation = validateMail(email);
      setErrors(validation);
      if (Object.keys(validation).length === 0) {
        if (await checkMail(email)) {
          const response = await sendOtpForgetPassword(email);
          console.log(response);
          if (response.error) {
            setErrors(response);
          } else if (response) {
            setToken(response);
            handleNext();
          }
        } else {
          setErrors({
            email:
              "Email address not found. Please make sure you have typed it correctly",
          });
        }
      }
      setDisabled(false);
    };

    return (
      <>
        <div className="mb-8 flex items-center justify-center">
          <NavLink>
            <MountainIcon className="h-10 w-10 text-darkblue" />
          </NavLink>
        </div>
        <h1 className="mb-4 text-3xl font-bold text-darkblue">
          Forgot Password
        </h1>
        <p className="mb-8 text-gray-500">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <Label className="mb-3 flex text-gray-700" htmlFor="email">
              Email Address
            </Label>
            <div className="relative flex items-center justify-center">
              <MailBoxIcon className="absolute left-2 top-5 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full rounded-lg border border-gray-300 px-10 py-3 focus:border-[#4B6CB7] focus:outline-none focus:ring-2 focus:ring-[#4B6CB7] "
                id="email"
                placeholder="Enter your email"
                onChange={updateEmail}
                defaultValue={email}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.email}
              </span>
            )}
          </div>
          <Button
            className="mb-6 w-full rounded-lg bg-darkblue py-3 font-bold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#4B6CB7] focus:ring-offset-2"
            type="submit"
            disabled={disabled}
          >
            <LockIcon className="mr-2 h-5 w-5" />
            Reset Password
          </Button>
          <div className="">
            <NavLink
              to="/login"
              className=" flex flex-row text-center justify-center items-center font-medium text-darkblue hover:underline"
            >
              <ArrowLeftIcon className=" mr-2 h-5 w-5" />
              Back to Login
            </NavLink>
          </div>
        </form>
      </>
    );
  };

  const OtpForm = () => {
    const inputRef = useRef(null);
    const [errors, setErrors] = useState({});

    const handleOtpChange = (value) => {
      setOtp(value);
    };
    const [otp, setOtp] = useState("");

    useEffect(() => {
      if (inputRef.current && otp.length == 5) {
        inputRef.current.blur();
      } else {
        inputRef.current.focus();
      }
    }, [otp]);

    const verifycode = async () => {
      const response = await verifyOtpResetPassword(otp, token);
      if (!response.error && response) {
        handleNext();
      } else {
        setErrors({
          otp: "Code verification failed. Please check the Code and try again",
        });
      }
    };

    const resendOtp = async () => {
      const response = await sendOtpForgetPassword(email);
    };

    return (
      <>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Verify Your Email
        </h1>
        <div className="space-y-6">
          <div className="text-center">
            <p className="mt-2 text-gray-500 pt-4">
              Enter the 6-digit code sent to your email.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-center flex-wrap">
                <InputOTP
                  maxLength={5}
                  className="flex flex-wrap"
                  onChange={handleOtpChange}
                  value={otp}
                  ref={inputRef}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {errors.otp && (
                <span className="text-red-500 flex justify-start text-sm ">
                  {errors.otp}
                </span>
              )}
              <div className="flex justify-between">
                <Button
                  className="w-1/2 rounded-lg bg-gray-100 py-3 font-medium text-[#272643] hover:bg-gray-200"
                  variant="outline"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  className="w-1/2 rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b]"
                  onClick={verifycode}
                >
                  Verify
                </Button>
              </div>
              <div className="flex justify-center">
                <Button
                  className="w-full rounded-lg bg-gray-100 py-3 font-medium text-[#272643] hover:bg-gray-200"
                  variant="outline"
                  onClick={resendOtp}
                >
                  Resend Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ResetPassword = () => {
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState();

    const handleChange = (e) => {
      form[e.target.name] = e.target.value;
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      setDisabled(true);
      const validation = validationResetPassword(
        form.newPassword,
        form.confirmNewPassword
      );
      if (Object.keys(validation).length === 0) {
        console.log("token : " + token);
        const response = await resetPassword(form.newPassword, token);
        if (response === true) {
          handleNext();
        } else {
          setErrors(response);
        }
      } else {
        setErrors(validation);
      }
      setDisabled(false);
    };
    return (
      <>
        <div className="mb-6 flex items-center justify-center">
          <NavLink to="/">
            <MountainIcon className="h-8 w-8 text-[#272643]" />
          </NavLink>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-[#272643]">
          Reset Password
        </h1>
        <p className="mb-6 text-gray-500">
          Enter your new password and confirm it.
        </p>
        <form onSubmit={onSubmit}>
          <div className="mb-4 text-left py-2">
            <Label className="mb-2 block text-gray-700" htmlFor="new-password">
              New Password
            </Label>
            <Input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#4B6CB7] focus:outline-none focus:ring-2 focus:ring-[#4B6CB7]"
              id="new-password"
              placeholder="Enter a new password"
              type="password"
              name="newPassword"
              onChange={handleChange}
              defaultValue={form.newPassword}
            />
            {errors.newPassword && (
              <span className="text-red-500 flex justify-start text-sm ">
                {errors.newPassword}
              </span>
            )}
          </div>
          <div className="mb-4 text-left py-2">
            <Label
              className="mb-2 block text-gray-700"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </Label>
            <Input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#4B6CB7] focus:outline-none focus:ring-2 focus:ring-[#4B6CB7]"
              id="confirm-password"
              placeholder="Confirm your new password"
              type="password"
              name="confirmNewPassword"
              onChange={handleChange}
              defaultValue={form.confirmNewPassword}
            />
            {errors.confirmNewPassword && (
              <span className="text-red-500 flex justify-start text-sm">
                {errors.confirmNewPassword}
              </span>
            )}
          </div>
          <Button
            className="mb-4 w-full rounded-md bg-[#272643] py-2 font-bold text-white hover:bg-[#1e1e3d] focus:outline-none focus:ring-2 focus:ring-[#272643] focus:ring-offset-2"
            type="submit"
            disabled={disabled}
          >
            Reset Password
          </Button>
        </form>
      </>
    );
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-[#e6f2ff] to-[#d3e3f7] to-white">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {currentForm === 0 && (
          <motion.div
            key="sendOtp"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <SendOtp />
          </motion.div>
        )}
        {currentForm === 1 && (
          <motion.div
            key="sendOtp"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <OtpForm />
          </motion.div>
        )}
        {currentForm === 2 && (
          <motion.div
            key="sendOtp"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <ResetPassword />
          </motion.div>
        )}
        {currentForm === 3 && (
          <motion.div
            key="succes"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Modal
              title="Password reset successful"
              content={
                "Your password has been reset successfully. You can now log in with your new password."
              }
              buttonTitle="Go to Login"
              onClick={redirect}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

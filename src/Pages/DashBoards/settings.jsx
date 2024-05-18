import { useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import {
//   DialogTrigger,
//   DialogTitle,
//   DialogDescription,
//   DialogHeader,
//   DialogFooter,
//   DialogContent,
//   Dialog,
// } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { validateChangePassword } from "../../assets/validations";
import Modal from "../../components/modal";
import { changePassword } from "../../assets/Apis/assets";

export default function Settings() {
  const formData = useRef({});
  const ChangePasswordDialog = () => {
    const [errors, setErrors] = useState({});
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const passwordChangedMessages = {
      Title: "Password Changed Successfully",
      Subtitle:
        "Your password has been updated. You can now use your new password to sign in securely.",
      buttonTitle: "Close",
    };

    const handleClose = () => setPasswordChanged(false);

    const toogleDialog = () => setOpenDialog((prev) => !prev);

    const onSubmit = async (e) => {
      e.preventDefault();
      const validation = validateChangePassword(
        formData.current.oldPassword,
        formData.current.newPassword,
        formData.current.confirmNewPassword
      );
      setErrors(validation);
      if (Object.keys(validation).length === 0) {
        const response = await changePassword(
          formData.current.oldPassword,
          formData.current.newPassword
        );
        console.log(response.data);
        if (!response.data) {
          setErrors(response);
        } else {
          setPasswordChanged(true);
          toogleDialog();
          formData.current = null;
        }
      }
    };

    const handleChange = (e) =>
      (formData.current = {
        ...formData.current,
        [e.target.name]: e.target.value,
      });
    return !passwordChanged ? (
      <AlertDialog open={openDialog}>
        <AlertDialogTrigger asChild>
          <Button
            className="text-[#272643] border-[#272643] hover:bg-[#272643] hover:text-white"
            variant="outline"
            onClick={toogleDialog}
          >
            Change Password
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px]">
          <form onSubmit={onSubmit}>
            <AlertDialogHeader>
              <AlertDialogTitle>Change Password</AlertDialogTitle>
              <AlertDialogDescription>
                Enter your current password and a new password to update your
                account security.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col justify-center gap-0 py-4">
              <div>
                <Label className="text-right" htmlFor="current-password">
                  Current Password*
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  name="oldPassword"
                  onChange={handleChange}
                  defaultValue={formData.current?.oldPassword || ""}
                />
                {errors.oldPassword && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.oldPassword}
                  </span>
                )}
              </div>
              <div>
                <Label className="text-right" htmlFor="new-password">
                  New Password*
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                  defaultValue={formData.current?.newPassword || ""}
                />
                {errors.newPassword && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.newPassword}
                  </span>
                )}
              </div>
              <div>
                <Label className="text-right" htmlFor="c-new-password">
                  Confirm New Password*
                </Label>
                <Input
                  id="c-new-password"
                  type="password"
                  name="confirmNewPassword"
                  onChange={handleChange}
                  defaultValue={formData.current?.confirmNewPassword || ""}
                />
                {errors.confirmNewPassword && (
                  <span className="text-red-500 flex justify-start text-sm ">
                    {errors.confirmNewPassword}
                  </span>
                )}
              </div>
            </div>
            <AlertDialogFooter className="flex flex-row justify-center gap-2">
              <AlertDialogCancel className="w-1/2 mt-0" onClick={toogleDialog}>
                Cancel
              </AlertDialogCancel>
              <Button className="w-1/2" type="submit">
                Change Password
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    ) : (
      <AlertDialog open={passwordChanged}>
        <AlertDialogContent>
          <Modal
            title={passwordChangedMessages.Title}
            content={passwordChangedMessages.Subtitle}
            buttonTitle={passwordChangedMessages.buttonTitle}
            onClick={handleClose}
          />
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div className="text-left gap-6  text-[#272643]">
      <Card className="flex flex-1/2 flex-col text-darkblue shadow ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">Security</CardTitle>
          <CardDescription className="text-gray-600">
            Manage your account security settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col space-y-1">
              <span className="font-medium">Two-Factor Authentication</span>
              <span className="text-gray-600 text-sm">
                Enhance the security of your account with 2FA.
              </span>
            </div>
            <Switch id="2fa" className="data-[state=checked]:bg-darkblue" />
          </div>

          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col space-y-1">
              <span className="font-medium">Notifications</span>
              <span className="text-gray-600 text-sm">
                Enable or disable notifications.
              </span>
            </div>
            <Switch
              id="notifications"
              className="data-[state=checked]:bg-darkblue"
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col space-y-1">
              <span className="font-medium">Change Password</span>
              <span className="text-gray-600 text-sm">
                Update your account password.
              </span>
            </div>
            <ChangePasswordDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

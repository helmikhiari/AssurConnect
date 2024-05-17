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
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";

export default function Settings() {
  const ChangePasswordDialog = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="text-[#272643] border-[#272643] hover:bg-[#272643] hover:text-white"
            variant="outline"
          >
            Change Password
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password to update your
              account security.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-center gap-0 py-4">
            <div>
              <Label className="text-right" htmlFor="current-password">
                Current Password
              </Label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <Label className="text-right" htmlFor="new-password">
                New Password
              </Label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <Label className="text-right" htmlFor="c-new-password">
                Confirm New Password
              </Label>
              <Input id="c-new-password" type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
            <Switch id="2fa" />
          </div>

          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col space-y-1">
              <span className="font-medium">Notifications</span>
              <span className="text-gray-600 text-sm">
                Enable or disable notifications.
              </span>
            </div>
            <Switch id="notifications" />
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

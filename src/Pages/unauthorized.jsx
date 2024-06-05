import { KeyIcon, LockIcon, ShieldIcon } from "../assets/icons/icons";

export default function Unauthorized() {
  return (
    <div className="flex h-full flex-col items-center justify-center  bg-gradient-to-b from-white via-[#e6f2ff] to-[#d3e3f7] px-4 py-12 text-[#272643]">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Unauthorized Access
        </h1>
        <p className="text-lg/relaxed">
          You do not have permission to access this page. Please contact the
          administrator for assistance.
        </p>
        <div className="flex justify-center space-x-6">
          <LockIcon className="h-8 w-8" />
          <ShieldIcon className="h-8 w-8" />
          <KeyIcon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}

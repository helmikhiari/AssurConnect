export default function ServerDown() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-white via-[#e6f2ff] to-[#d3e3f7] to-white">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-red-500 p-6 text-white">
          <ServerOffIcon className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold">Server Down</h1>
        <p className="text-gray-500">
          Oops, it looks like our server is experiencing some technical
          difficulties. We're working hard to get it back up and running as soon
          as possible.
        </p>
      </div>
    </div>
  );
}

function ServerOffIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5" />
      <path d="M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z" />
      <path d="M22 17v-1a2 2 0 0 0-2-2h-1" />
      <path d="M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z" />
      <path d="M6 18h.01" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

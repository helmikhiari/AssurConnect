import { Button } from "@/components/ui/button"

export default function Modal({title,content,buttonTitle,onClick}) {
  
  const onSubmit=(e)=>{
    e.preventDefault()
    onClick()
  }
  return (
            <form onSubmit={onSubmit}>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-[#272643] flex items-center justify-center text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-gray-500">
                  {content}
                </p>
              </div>
              <Button className="w-full rounded-lg bg-[#272643] py-3 font-medium text-white hover:bg-[#1c1e3b]" type="submit">
                {buttonTitle}
              </Button>
            </div>
            </form>
  )
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

const LogIn = () => {
  return (
    <>
      <div className="w-96 m-auto p-5 bg-gray-200 rounded-lg flex flex-col gap-5">
        <Input placeholder="Username" className="bg-white" />
        <Input placeholder="Password" className="bg-white" />
        <Button>Log In</Button>
      </div>

    </>
  )
}

export default LogIn;
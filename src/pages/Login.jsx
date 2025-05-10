import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <>
      <div className="w-96 m-auto p-5 bg-gray-200 rounded-lg flex flex-col gap-5">
        <h2 className="text-xl text-center font-semibold">Log In</h2>
        <Input placeholder="Username" className="bg-white" />
        <Input placeholder="Password" className="bg-white" />
        <Button>Log In</Button>
        <p className="text-sm">Create new account: <Link to="/signup" className="text-blue-600">sign up</Link></p>
      </div>

    </>
  )
}

export default LogIn;
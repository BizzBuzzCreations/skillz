import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <div className="w-96 m-auto p-5 bg-gray-200 rounded-lg flex flex-col gap-5">
        <h2 className="text-xl text-center font-semibold">Create an account</h2>
        <Input placeholder="Full Name" className="bg-white" />
        <Input placeholder="Username" className="bg-white" />
        <Input placeholder="Password" className="bg-white" />
        <Button>Sign Up</Button>
        <p className="text-sm">Already have an account: <Link to="/login" className="text-blue-600">log in</Link></p>
      </div>

    </>
  )
}

export default SignUp;
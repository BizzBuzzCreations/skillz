import logo from '@/assets/Skillz.png'
import { Button } from './ui/button';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideLogout = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="flex justify-between items-center bg-gray-50 w-full p-4 shadow-sm mb-5">
      <Link to="/" className='text-2xl font-mono text-blue-500'><img src={logo} alt="BBCskillz" className='h-9' /></Link>
      {/* <ul className='flex gap-4 ml-4 text-slate-700'>
        <li><a href="#" className="active">Home</a></li>
        <li><a href="#" className="">Courses</a></li>
        <li><a href="#" className="">Dashboard</a></li>
        <li><a href="#" className="">Caterogies</a></li>
        <li><a href="#" className="">FAQ</a></li>
      </ul> */}
      {!hideLogout && (
        <>

          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
              <p className='text-lg'>Welcome, John Doe</p>
              <Button onClick={() => navigate('/login')}>Log out</Button>
            </PopoverContent>
          </Popover>

        </>
      )}



    </nav>
  )
}

export default Navbar;
import logo from '@/assets/Skillz.png'
import { Button } from './ui/button';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Plus } from 'lucide-react';
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";


const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideLogout = location.pathname === "/login" || location.pathname === "/signup";

  const { user } = useContext(AuthContext);

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center bg-gray-50 w-full p-4 shadow-sm mb-5">
      <Link to="/" className='text-2xl font-mono text-blue-500'><img src={logo} alt="BBCskillz" className='h-9' /></Link>

      {!hideLogout && (
        <>
          <div className='flex gap-4 items-center'>
            {(user?.role === 'admin' || user?.role === 'instructor') && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/upload">
                      <Plus width={32} height={32} className="text-purple-900 bg-purple-200 rounded-full p-2" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Upload new course</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2">
                <div className='text-lg'>
                  Welcome, {user?.name || user?.email || "User"}
                </div>
                <Button onClick={handleLogout}>Log out</Button>
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbar;
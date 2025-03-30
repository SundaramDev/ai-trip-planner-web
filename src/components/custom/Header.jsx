import React, { useEffect, useState } from 'react'; // ✅ Added missing import for useState
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google"; // ✅ Import googleLogout and useGoogleLogin correctly
import axios from "axios"; // ✅ Ensure axios is imported
import { FcGoogle } from "react-icons/fc"; // ✅ Import Google icon

function Header() {
  const [openDialog, setOpenDialog] = useState(false); // ✅ Fixed useState declaration
  const user = JSON.parse(localStorage.getItem('user')) || null; // ✅ Prevents errors if 'user' is null

  useEffect(() => {
    console.log(user);
  }, []); // ✅ Removed 'user' from dependencies to prevent unnecessary re-renders

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      console.log("Google Login Success:", tokenInfo);
      GetUserProfile(tokenInfo);
    },
    onError: (error) => console.log("Google Login Error:", error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "application/json"
      }
    })
      .then((resp) => {
        console.log("User Profile:", resp.data);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  };

  return (
    <div className="relative p-3 shadow-sm flex items-center px-5">
      <img src="/logo.svg" alt="Logo" />
      <div className="absolute right-0 flex items-center gap-3"> {/* ✅ Ensured proper alignment */}
        {user ? (
          <div className="flex items-center gap-5"> {/* ✅ Wrapped in flex for alignment */}
            <a href='/create-trip'>
              <Button variant="outline" className="rounded-full bg-black text-white">+ Create Trip </Button>
            </a>
            <a href='/my-trips'>
              <Button variant="outline" className="rounded-full bg-black text-white">My Trips </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} alt="User" className="h-[35px] w-[35px] rounded-full" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout(); // ✅ Now properly imported and called
                  localStorage.removeItem('user'); // ✅ Remove only user-related data
                  window.location.reload(); // ✅ Ensure page reloads after logout
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)} className="bg-black text-white">Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-sm w-full p-6 rounded-lg shadow-lg bg-white flex flex-col items-center text-center">
          <DialogHeader>
            <h2 className="font-bold text-lg">Sign In With Google</h2>
          </DialogHeader>
          <DialogDescription className="text-gray-600 text-sm mt-2">
            Sign in to the App with Google authentication securely
          </DialogDescription>
          <Button onClick={login} variant="outline" className="mt-4 w-full flex gap-4 items-center bg-black text-white">
            <FcGoogle className='h-7 w-7' />Sign In With Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;

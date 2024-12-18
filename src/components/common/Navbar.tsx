"use client";
import React, { useContext, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AuthContext } from "@/providers/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Image from "next/image";
import logo from "../../../public/image/logo.png";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { resetCart } from "@/redux/features/cart/cartSlice";
import { logout } from "@/services/authService";
import { Button } from "../ui/button";

export function NavbarDemo() {
  return (
    <div className="relative w-full  flex items-center justify-center">
      <Navbar className="top-0 " />
    
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { cartItems } = useAppSelector((state) => state.cartSlice);
  const getDashboardLink = (role: string): string => {

    if (role === "ADMIN") {
      return "/admin/dashboard";
    }
  
    return `/${role.toLowerCase()}/dashboard`;
  };
  const userData = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const logoutUser = async () => {
    dispatch(resetCart());
    await logout();
    userData?.setIsLoading(true);
  };
  
  return (
    <div
      className={cn("responsive w-full", className)}
    >
      <Menu setActive={setActive}>
      <div className="flex justify-between">
      <div >
    <Link href="/">
    <Image
        src={logo}
        width={100}
        height={10}
        alt='logo'
      />
    </Link>
      </div>
   <div className="hidden md:flex text-white space-x-6 mt-1">
   <Link href="/"><MenuItem setActive={setActive} active={null} item="Home">
        </MenuItem></Link>
        <Link href="/product"><MenuItem setActive={setActive} active={null} item="Products">
        </MenuItem></Link>
        <Link href="/shop"> 
        <MenuItem setActive={setActive} active={null} item="Shop">
          {/* <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="/"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="/"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="/"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="/"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div> */}
        </MenuItem>
        </Link>
        {/* <Link href="/about"> 
        <MenuItem setActive={setActive} active={null} item="About"> */}
          {/* <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div> */}
        {/* </MenuItem> */}
        {/* </Link> */}
        <Link href="/about"><MenuItem setActive={setActive} active={null} item="About">
        </MenuItem></Link>
        <Link href="/compair-product"><MenuItem setActive={setActive} active={null} item="Comparison">
        </MenuItem></Link>
        {
          userData?.user ? (<Link href={getDashboardLink(userData.user.role)}> <MenuItem setActive={setActive} active={null} item="Dashboard">
        </MenuItem></Link>) :
        (null)
        }
   </div>
         <div className="flex gap-4">
          {
            userData?.user &&  <Button
            className="bg-white  hover:bg-white text-black hover:scale-95"
            onClick={() => logoutUser()}
          >
            Logout
          </Button>
          }
        {
          userData?.user ?  <Link href={`${userData?.user?.role.toLocaleLowerCase()}/dashboard`}><FaUserCircle className=" w-6 h-6"/></Link> :
<Link href="/auth/signin"><FaUserCircle className=" w-6 h-6"/></Link> 
        }
         {userData?.user?.role == "CUSTOMER" &&  <Link href="/cart" className="flex">
         <FaCartShopping className=" w-6 h-6"/> 
        {cartItems.length > 0 ? <span className="bg-amber-600 h-5 px-1.5 rounded-full text-sm -ml-2 -mt-2">{cartItems.length}</span>  : ''}
        
      </Link>}
         </div>
      </div>
      </Menu>
    </div>
  );
}



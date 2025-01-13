"use client";
import React, { useContext} from "react";
import Link from "next/link";
import { FiBox } from "react-icons/fi";
import { AuthContext } from "@/providers/AuthProvider";
import { MdOutlineLogout, MdOutlinePayments, MdOutlineSpaceDashboard } from "react-icons/md";import { LuArrowRightLeft, LuShoppingBag } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { resetCart } from "@/redux/features/cart/cartSlice";
import { logout } from "@/services/authService";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { RiMenu3Fill } from "react-icons/ri";
import { PlaceholdersAndVanishInputDemo } from "../design/PlaceholdersAndVanishInputDemo";
import {
  LogIn,
  ShoppingCart,
 
} from "lucide-react";
import { useGetUserDashboard } from "@/hooks/dashboard";
import { IoCartOutline, IoStarOutline } from "react-icons/io5";
import { useAllCategory } from "@/hooks/category.hook";

  const Navbar = () => {
      const { data: categoryData } = useAllCategory(); // Assuming `isLoading` is available
      const dispatch = useAppDispatch();
    const pathname = usePathname();

    const { cartItems } = useAppSelector((state) => state.cartSlice);
    const getDashboardLink = (role: string): string => {
  
      if (role === "ADMIN") {
        return "/admin/dashboard";
      }
    
      return `/${role.toLowerCase()}/dashboard`;
    };
    const userData = useContext(AuthContext);
    const Role = userData?.user?.role;
     const { data, isLoading, error } = useGetUserDashboard();
   const profilePicture = data?.data?.customer?.image;
    
  
    const logoutUser = async () => {
      dispatch(resetCart());
      await logout();
      userData?.setIsLoading(true);
    };
    
    const links = [
      { href: "/", label: "Home" },
      { href: "/product", label: "Products" },
      { href: "/shop", label: "Shops" },
      { href: "/compair-product", label: "Compair" },
      { href: "/flashsale", label: "Flash" },
      { href: "/about", label: "About" },
    ];

  return (
    <div className="fixed top-0 z-50 w-full bg-white ">
  {/* navbar part 1  */}
  <div className="navbar my-1 bg-white dark:bg-white container mx-auto">
  <div className="navbar-start">
   <Logo />
   <div className="">
   <PlaceholdersAndVanishInputDemo />
   </div>
  </div>
  
  <div className="navbar-end">
  <div className="mr-3 mt-1">
  <Link href='/recent-products'><LuArrowRightLeft className="w-6 h-6" /></Link>
  </div>
  <div className="mr-3 mt-1">
  {Role == "CUSTOMER" &&  <Link href="/cart" className="flex">
         <ShoppingCart className="w-6 h-6"/> 
        {cartItems.length > 0 ? <span className="bg-amber-600 h-5 px-1.5 rounded-full text-sm -ml-2 -mt-2">{cartItems.length}</span>  : ''}
        
      </Link>}
  </div>
      {
          userData?.user ?  
            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
          <img
          className="w-10 h-10 mt-1 rounded-full"
          src={profilePicture || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"}
          alt="logo"
        />
  <ul tabIndex={0} className="dropdown-content menu bg-white rounded-lg z-[1] w-48 py-2 shadow">
  <Link href={`${Role?.toLocaleLowerCase()}/dashboard`}><li> <a><MdOutlineSpaceDashboard /> Dashboard</a></li></Link>
  <Link href='/recent-products'><li><a><IoCartOutline /> Recent Products</a></li></Link>
  <Link href='/cart'> <li><a><LuShoppingBag /> Purchased Items</a></li></Link>
  <Link href={`${Role?.toLocaleLowerCase()}/dashboard`}><li><a><IoStarOutline /> My Reviews</a></li></Link>
  <Link href={`${Role?.toLocaleLowerCase()}/dashboard`}><li><a><MdOutlinePayments /> Payments</a></li></Link>
  <Link href={`${Role?.toLocaleLowerCase()}/dashboard`}><li><a><FiBox /> Favorite Sellers</a></li></Link>
  <Link href={`${Role?.toLocaleLowerCase()}/dashboard`}><li><a><CgProfile /> Profile</a></li></Link>
    <div className="bg-neutral-300 h-[1px] w-full" />
    <li><p onClick={logoutUser}><MdOutlineLogout /> Logout</p></li>
  </ul>
</div>
          :
<Link href="/auth/signin"><LogIn /></Link> 
        }
  </div>
</div>
<div className="bg-neutral-300 h-[1px] w-full" />
  {/* navbar part 2  */}
  <div className="bg-neutral-300 w-full" />
      <div className="navbar container mx-auto bg-white dark:bg-white">
  <div className="navbar-start">
{/* all category drowpdown  */}
    <div className="dropdown dropdown-hover">
  <div className="rounded-lg px-3 py-2 bg-orange-500 text-white">Browse Categories</div>
  <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>

   {/* <Logo /> */}
  </div>
  <div className="navbar-end ">
    <div className="hidden lg:flex">
    <ul className="menu menu-horizontal ">
    {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li className="text-sm xl:text-lg"> <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${isActive ? "text-orange-500" : "text-gray-500"}`}
          >
            {link.label}
          </Link></li>
        );
      })}
    </ul>
    </div>
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
      <RiMenu3Fill className="w-5 h-5"/>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
         {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li className="text-lg"><Link
            key={link.href}
            href={link.href}
            className={`nav-link ${isActive ? "text-orange-500" : "text-gray-500"}`}
          >
            {link.label}
          </Link></li>
        );
      })}
      </ul>
    </div>
  </div>
 
</div> <div className="bg-neutral-300 h-[1px] w-full" />
    </div>
  );
}


export default Navbar;
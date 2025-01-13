"use client";
import React, { useContext} from "react";
import Link from "next/link";
import { FiBox } from "react-icons/fi";
import { AuthContext } from "@/providers/AuthProvider";
import { MdOutlineLogout, MdOutlinePayments, MdOutlineSpaceDashboard } from "react-icons/md";import { LuArrowRightLeft, LuShoppingBag } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { resetCart, setCategoryId } from "@/redux/features/cart/cartSlice";
import { logout } from "@/services/authService";
import { CgProfile } from "react-icons/cg";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { RiMenu3Fill } from "react-icons/ri";

import {
  LogIn,
  ShoppingCart,
 
} from "lucide-react";
import { useGetUserDashboard } from "@/hooks/dashboard";
import { IoCartOutline, IoStarOutline } from "react-icons/io5";
import { useAllCategory } from "@/hooks/category.hook";
import { PlaceholdersAndVanishInputDemo } from "../design/PlaceholdersAndVanishInputDemo";

  const Navbar = () => {
      const { data: categoryData } = useAllCategory(); 
      const dispatch = useAppDispatch();
    const pathname = usePathname();

    const { cartItems } = useAppSelector((state) => state.cartSlice);
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
      { id: 1, href: "/", label: "Home" },
      { id: 2, href: "/product", label: "Products" },
      { id: 3, href: "/shop", label: "Shops" },
      { id: 4, href: "/compair-product", label: "Compair" },
      { id: 5, href: "/flashsale", label: "Flash" },
      { id: 6, href: "/about", label: "About" },
    ];

  return (
    <div className="fixed top-0 z-50 w-full bg-white ">
  {/* navbar part 1  */}
  <div className="navbar my-1 bg-white dark:bg-white container mx-auto">
  <div className="navbar-start">
   <Logo />
   <div>
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
  <Link href={`${Role?.toLocaleLowerCase()}/order-history`}><li><a><MdOutlinePayments /> Payments</a></li></Link>
  <Link href={`${Role?.toLocaleLowerCase()}/dashboard`}><li><a><FiBox /> Favorite Sellers</a></li></Link>
  <Link href={`${Role?.toLocaleLowerCase()}/dashboard`}><li><a><CgProfile /> Profile</a></li></Link>
    <p className="bg-neutral-300 h-[1px] w-full" />
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
  <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-40 p-2 shadow">
  {categoryData?.data?.map(({ categoryId, name }) => (
          <div key={categoryId}>
            <Link
              href="/product"
              onClick={() => dispatch(setCategoryId(categoryId))}
              className=''
            >
              <div className='p-2 rounded-lg hover:bg-gray-200'>{name}</div>
            </Link>
          </div>
        ))}
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
            key={link.label}
            href={link.href}
            className={`nav-link ${isActive ? "text-orange-500" : "text-gray-500"}`}
          >
            {link.label}
          </Link></li>
        );
      })}
    </ul>
    </div>
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
      <RiMenu3Fill className="w-5 h-5"/>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-38 p-2 shadow">
         {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li className="text-lg"><Link
            key={link.id}
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
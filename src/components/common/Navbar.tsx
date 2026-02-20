"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/providers/AuthProvider";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { resetCart, setCategoryId } from "@/redux/features/cart/cartSlice";
import { logout } from "@/services/authService";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import {
  LogIn,
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  User,
  History,
  Star,
  ChevronDown,
  Menu,
  X,
  ArrowRightLeft,
  LayoutGrid
} from "lucide-react";
import { useGetUserDashboard } from "@/hooks/dashboard";
import { useAllCategory } from "@/hooks/category.hook";
import { PlaceholdersAndVanishInputDemo } from "../design/PlaceholdersAndVanishInputDemo";

const Navbar = () => {
  const { data: categoryData } = useAllCategory();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { cartItems } = useAppSelector((state) => state.cartSlice);
  const userData = useContext(AuthContext);
  const Role = userData?.user?.role;
  const { data, isLoading } = useGetUserDashboard();
  const profilePicture = data?.data?.customer?.image;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const logoutUser = async () => {
    dispatch(resetCart());
    await logout();
    userData?.setIsLoading(true);
    window.location.href = "/"; // Force refresh to clear state
  };

  const links = [
    { id: 1, href: "/", label: "Home" },
    { id: 2, href: "/product", label: "Products" },
    { id: 3, href: "/shop", label: "Shops" },
    { id: 4, href: "/compair-product", label: "Compare" },
    { id: 5, href: "/flashsale", label: "Flash Sale" },
    { id: 6, href: "/about", label: "About" },
  ];

  return (
    <div className="fixed top-0 z-50 w-full transition-all duration-300">
      {/* ─── Loading Progress Bar ─── */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-[3px] bg-rose-50 overflow-hidden z-[60]">
          <div className="h-full bg-rose-500 animate-[loading_2s_ease-in-out_infinite] origin-left shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
        </div>
      )}

      {/* ─── Top Navbar (Main) ─── */}
      <div className="bg-white border-b border-gray-100 shadow-sm relative z-50">
        <div className="container mx-auto px-4 lg:px-6 py-4 flex items-center justify-between gap-4 md:gap-8">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Search Section (FilterSection) */}
          <div className="hidden sm:block flex-1 max-w-2xl">
            <PlaceholdersAndVanishInputDemo />
          </div>

          {/* User Actions Section */}
          <div className="flex items-center gap-2 md:gap-5">
            {/* Compare/Recent Link */}
            <Link 
              href='/recent-products'
              className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-500 hover:text-rose-500 transition-all active:scale-95 relative group"
              title="Recent Products"
            >
              <ArrowRightLeft className="w-5.5 h-5.5" />
            </Link>

            {/* Cart Link */}
            {Role === "CUSTOMER" && (
              <Link 
                href="/cart" 
                className="p-2.5 rounded-xl hover:bg-rose-50 text-gray-500 hover:text-rose-500 transition-all active:scale-95 relative flex items-center"
              >
                <ShoppingCart className="w-5.5 h-5.5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            {/* Auth/User Dropdown */}
            {userData?.user ? (
              <div className="dropdown dropdown-end dropdown-hover group">
                <div tabIndex={0} role="button" className="flex items-center gap-2 p-1 pl-1 pr-2 rounded-full border border-gray-100 bg-gray-50 hover:border-rose-100 hover:bg-rose-50/30 transition-all">
                  <div className="relative">
                    <img
                      className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                      src={profilePicture || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"}
                      alt="profile"
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-rose-500 transition-transform group-hover:rotate-180" />
                </div>
                
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-white rounded-2xl z-[1] w-56 border border-gray-50 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Signed in as</p>
                    <p className="text-sm font-black text-gray-900 truncate">{userData.user.userEmail}</p>
                  </div>
                  
                  <li>
                    <Link href={`/${Role?.toLocaleLowerCase()}/dashboard`} className="flex items-center gap-3 py-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> 
                      <span className="font-semibold">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link href='/recent-products' className="flex items-center gap-3 py-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors">
                      <History className="w-4 h-4" /> 
                      <span className="font-semibold">Recent Products</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${Role?.toLocaleLowerCase()}/dashboard`} className="flex items-center gap-3 py-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors">
                      <Star className="w-4 h-4" /> 
                      <span className="font-semibold">My Reviews</span>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${Role?.toLocaleLowerCase()}/profile`} className="flex items-center gap-3 py-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors">
                      <User className="w-4 h-4" /> 
                      <span className="font-semibold">My Profile</span>
                    </Link>
                  </li>
                  
                  <div className="h-px bg-gray-50 my-1"></div>
                  
                  <li>
                    <button 
                      onClick={logoutUser} 
                      className="flex items-center gap-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> 
                      <span className="font-bold">Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link 
                href="/auth/signin"
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-rose-500 transition-all active:scale-95 shadow-lg shadow-gray-200 hover:shadow-rose-100 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ─── Bottom Navbar (Links & Categories) ─── */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-50/50 hidden md:block">
        <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            {/* Category Dropdown */}
            <div className="dropdown dropdown-hover group">
              <div tabIndex={0} role="button" className="h-10 px-5 bg-gray-900 hover:bg-rose-500 text-white rounded-xl flex items-center gap-2.5 text-xs font-black uppercase tracking-widest transition-all duration-300 active:scale-95">
                <LayoutGrid className="w-4 h-4" />
                Browse Categories
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 opacity-50" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-white rounded-2xl z-[1] w-56 border border-gray-50 mt-1 animate-in fade-in slide-in-from-top-2 duration-200 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 mb-1 border-b border-gray-50">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available Categories</p>
                </div>
                {categoryData?.data?.map(({ categoryId, name }) => (
                  <li key={categoryId}>
                    <Link
                      href="/product"
                      onClick={() => dispatch(setCategoryId(categoryId))}
                      className="py-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 font-semibold text-sm flex items-center justify-between group/link"
                    >
                      {name}
                      <ChevronDown className="-rotate-90 w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-all -translate-x-2 group-hover/link:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nav Links */}
            <nav>
              <ul className="flex items-center gap-1 xl:gap-2">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className={`px-4 py-2 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          isActive 
                            ? "bg-rose-50 text-rose-600" 
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-2">
             <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live Updates Active
             </div>
          </div>
        </div>
      </div>

      {/* ─── Deals Strip (Positioned Lower than Profile/Main Nav) ─── */}
      <div className="bg-emerald-50/50 border-b border-emerald-100/50 py-1.5 hidden md:block transition-all hover:bg-emerald-50">
        <div className="container mx-auto px-6 flex justify-end">
          <Link 
            href="/flashsale" 
            className="group flex items-center gap-2.5 text-[10px] font-black text-emerald-700 uppercase tracking-[0.25em] transition-all"
          >
             <span className="flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 group-hover:scale-125 transition-transform"></span>
             </span>
             Special Deals Live: Explore Flash Sale Discounts
             <ChevronDown className="-rotate-90 w-3.5 h-3.5 opacity-50 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ─── Mobile Menu Component (Optional toggle) ─── */}
      <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-2 flex items-center justify-between">
         <div className="flex-1 max-w-[200px]">
             <PlaceholdersAndVanishInputDemo />
         </div>
         <button 
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
           className="p-2 rounded-xl bg-gray-50 text-gray-900 active:scale-95 transition-all"
         >
           {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
         </button>
      </div>
      
      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[110px] z-40 bg-white md:hidden animate-in fade-in slide-in-from-right duration-300">
           <div className="p-6 space-y-6">
              <div className="space-y-2">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Navigations</p>
                 {links.map(link => (
                    <Link 
                      key={link.id} 
                      href={link.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-2xl text-lg font-bold ${pathname === link.href ? 'bg-rose-50 text-rose-500' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {link.label}
                    </Link>
                 ))}
              </div>
              
              <div className="pt-6 border-t border-gray-50">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Account</p>
                 <Link 
                   href="/cart" 
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gray-50 text-gray-700 font-bold"
                 >
                   My Cart
                   <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">{cartItems.length}</span>
                 </Link>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
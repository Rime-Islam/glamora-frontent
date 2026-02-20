"use client";

import { Dialog, DialogTitle, DialogContent } from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/providers/AuthProvider";
import {
  Home,
  Settings,
  ListOrdered,
  UserCircle,
  LayoutGrid,
  Store,
  MessageSquare,
  LogOut,
  Tag as TagIcon
} from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import Logo from "../Logo";
import { usePathname } from "next/navigation";
import { logout } from "@/services/authService";

const Clock = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Tag = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </svg>
);

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    roles: ["ADMIN", "CUSTOMER", "VENDOR"],
  },
  // Admin links
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutGrid,
    roles: ["ADMIN"],
  },
  {
    title: "My Profile",
    url: "/admin/profile",
    icon: UserCircle,
    roles: ["ADMIN"],
  },
  {
    title: "User Management",
    roles: ["ADMIN"],
    child: [
      { url: "/admin/manage-user", title: "Manage User", icon: Settings },
    ],
  },
  {
    title: "Shop Management",
    roles: ["ADMIN"],
    child: [
      {
        url: "/admin/manage-shop",
        title: "Manage Shop",
        icon: Store,
      },
    ],
  },
  {
    title: "Product-Category Management",
    roles: ["ADMIN"],
    child: [
      {
        url: "/admin/manage-category",
        title: "Manage Category",
        icon: LayoutGrid,
      },
    ],
  },
  {
    title: "Order Management",
    roles: ["ADMIN"],
    child: [
      { url: "/admin/view-order", title: "All Order", icon: ListOrdered },
      {
        url: "/admin/pending-order",
        title: "Pending Order",
        icon: Clock,
      },
    ],
  },
  // Vendor links
  {
    title: "Dashboard",
    url: "/vendor/dashboard",
    icon: LayoutGrid,
    roles: ["VENDOR"],
  },
  {
    title: "My Profile",
    url: "/vendor/profile",
    icon: UserCircle,
    roles: ["VENDOR"],
  },
  {
    title: "Shop Management",
    roles: ["VENDOR"],
    child: [
      { url: "/vendor/manage-shop", title: "Create Shop", icon: Settings },
      { url: "/vendor/shop", title: "Your Shop", icon: Store },
      { url: "/vendor/manage-product", title: "Create Product", icon: Settings },
      { url: "/vendor/cupon", title: "Add Coupon", icon: TagIcon },
    ],
  },
  {
    title: "Order Management",
    roles: ["VENDOR"],
    child: [
      {
        url: "/vendor/view-orders",
        title: "All Orders",
        icon: ListOrdered,
      },
    ],
  },
  {
    title: "Review Management",
    roles: ["VENDOR"],
    child: [
      {
        url: "/vendor/review-rating",
        title: "User Reviews",
        icon: MessageSquare,
      },
    ],
  },
  // Customer links
  {
    title: "Dashboard",
    url: "/customer/dashboard",
    icon: LayoutGrid,
    roles: ["CUSTOMER"],
  },
  {
    title: "My Profile",
    url: "/customer/profile",
    icon: UserCircle,
    roles: ["CUSTOMER"],
  },
  {
    title: "Order Management",
    roles: ["CUSTOMER"],
    child: [
      {
        url: "/customer/order-history",
        title: "Order History",
        icon: ListOrdered,
      },
    ],
  },
];


export default function AppSidebar() {
  const userData = useContext(AuthContext);
  const pathname = usePathname();

  const filteredItems = items.filter((item) =>
    item.roles.includes(userData?.user?.role as string)
  );

  const handleLogout = async () => {
    await logout();
    userData?.setUser(null);
    window.location.href = "/";
  };

  return (
    <Dialog>
      <Sidebar className="border-r border-gray-100">
        <SidebarContent className="bg-white">
          <DialogContent>
            <DialogTitle />
          </DialogContent>

          <div className="px-6 py-8">
            <Logo />
          </div>

          <SidebarGroup className="px-3">
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredItems.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <div key={item.title} className="mb-2">
                      {/* Parent Item */}
                      {item.url && (
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            className={`h-11 px-4 rounded-xl transition-all duration-200 ${
                              isActive
                                ? "bg-rose-50 text-rose-600 font-bold shadow-sm shadow-rose-100"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <Link href={item.url}>
                              <item.icon
                                className={`w-4.5 h-4.5 ${
                                  isActive ? "text-rose-600" : "text-gray-400"
                                }`}
                              />
                              <span className="ml-1">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}

                      {/* Group and Children */}
                      {item.child && (
                        <div className="mt-4 first:mt-0">
                          <SidebarGroupLabel className="px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-2">
                            {item.title}
                          </SidebarGroupLabel>
                          <div className="space-y-1">
                            {item.child.map((child) => {
                              const isChildActive = pathname === child.url;
                              return (
                                <SidebarMenuItem key={child.title}>
                                  <SidebarMenuButton
                                    asChild
                                    className={`h-10 px-4 rounded-xl transition-all duration-200 ${
                                      isChildActive
                                        ? "bg-rose-50 text-rose-600 font-bold shadow-sm shadow-rose-100"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                  >
                                    <Link href={child.url}>
                                      <child.icon
                                        className={`w-4 h-4 ${
                                          isChildActive
                                            ? "text-rose-600"
                                            : "text-gray-400"
                                        }`}
                                      />
                                      <span className="ml-1">{child.title}</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Footer */}
        <SidebarFooter className="p-4 bg-white border-t border-gray-100">
            <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300 group"
            >
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <LogOut className="w-4 h-4" />
                </div>
                <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">Session</p>
                    <p className="text-sm font-bold opacity-80 group-hover:opacity-100">Terminate Access</p>
                </div>
            </button>
        </SidebarFooter>
      </Sidebar>
    </Dialog>
  );
}
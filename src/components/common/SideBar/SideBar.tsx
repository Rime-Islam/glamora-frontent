"use client";

import { Dialog, DialogTitle } from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/providers/AuthProvider";
import { DialogContent } from "@radix-ui/react-dialog";
import {
  ShoppingBag,
  Home,
  Database,
  Settings,
  ListOrderedIcon,
  ListOrdered,
  UserCircle,
  ShoppingCartIcon,
  ChartNoAxesGanttIcon,
  MessageCircleHeartIcon,
} from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import Logo from "../Logo";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    roles: ["ADMIN", "CUSTOMER", "VENDOR"],
  },
  //admin link
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Database,
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
        icon: ShoppingCartIcon,
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
        icon: ChartNoAxesGanttIcon,
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
        icon: ListOrdered,
      },
    ],
  },

  // vendor links
  {
    title: "Dashboard",
    url: "/vendor/dashboard",
    icon: Database,
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
      { url: "/vendor/shop", title: "Your Shop", icon: ShoppingBag },
      { url: "/vendor/manage-product", title: "Create Product", icon: Settings },
      { url: "/vendor/cupon", title: "Add Cupon", icon: ShoppingBag },
    ],
  },
  {
    title: "Order Management",
    roles: ["VENDOR"],
    child: [
      {
        url: "/vendor/view-orders",
        title: "All Order",
        icon: ListOrderedIcon,
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
        icon: MessageCircleHeartIcon,
      },
    ],
  },
  // customer
  {
    title: "Dashboard",
    url: "/customer/dashboard",
    icon: Database,
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
        icon: ListOrderedIcon,
      },
    ],
  },
];

export default function AppSidebar() {
  const userData = useContext(AuthContext);

  const filteredItems = items.filter((item) =>
    item.roles.includes(userData?.user?.role as string)
  );

  return (
    <Dialog>
      <Sidebar className="absolute bg-white">
        <SidebarContent>
          <DialogContent>
            <DialogTitle></DialogTitle>
          </DialogContent>

          <SidebarGroup>
            <SidebarGroupLabel><div className="font-bold text-lg">
            <Logo /> </div></SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="ms-2 mt-8">
                {filteredItems.map((item) => (
                  <div key={item.title}>
                    {/* Parent Item */}
                    {item.url && (
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link href={item.url} >
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}

                    {/* Child Items */}
                    {item.child && (
                      <>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        {item.child.map((child) => (
                          <SidebarMenuItem key={child.title}>
                            <SidebarMenuButton asChild>
                              <Link className="" href={child.url}>
                                <child.icon />
                                <span>{child.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
      </Sidebar>
    </Dialog>
  );
}
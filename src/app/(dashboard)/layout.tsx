import React, { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/SideBar/SideBar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto max-w-full relative overflow-hidden">
      <SidebarProvider className="h-screen">
        <AppSidebar />
        <main className="w-full overflow-y-auto bg-gray-50/50">
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-2.5">
            <SidebarTrigger />
          </div>
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
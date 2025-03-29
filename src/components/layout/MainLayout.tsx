
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { SidebarHeader } from "./SidebarHeader";
import { HeaderBanner } from "./HeaderBanner";
import { cn } from "@/lib/utils";

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const sidebarWidth = collapsed ? "w-16" : "w-64";
  const sidebarTransition = "transition-all duration-300 ease-smooth";

  return (
    <div className={cn("flex min-h-screen bg-gray-50", mounted ? "animate-fade-in" : "opacity-0")}>
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col vibrant-sidebar",
        sidebarWidth,
        sidebarTransition
      )}>
        <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        
        <div className={cn("px-3 overflow-y-auto flex-1", collapsed ? "items-center" : "")}>
          <SidebarNav />
        </div>
        
        <div className="p-4">
          <div className="text-xs text-slate-500">
            {!collapsed && "© 2023 Artefact"}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-smooth bg-gray-50",
        collapsed ? "ml-16" : "ml-64",
        "p-6"
      )}>
        <div className="max-w-7xl w-full mx-auto">
          <HeaderBanner />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

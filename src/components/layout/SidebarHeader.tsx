
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarHeaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export function SidebarHeader({ collapsed, setCollapsed }: SidebarHeaderProps) {
  return (
    <div className={cn(
      "flex items-center transition-all duration-300",
      collapsed ? "justify-center py-4 px-2" : "justify-between py-5 px-4"
    )}>
      {!collapsed && (
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-0.5">
            <img 
              src="/lovable-uploads/c91593ad-aa3a-4f49-b9f4-86d049161286.png" 
              alt="Artefact Logo" 
              className="h-9 w-9 rounded bg-white/90"
            />
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Artefact
          </span>
        </div>
      )}
      {collapsed && (
        <div className="flex items-center justify-center w-full">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-0.5">
            <img 
              src="/lovable-uploads/c91593ad-aa3a-4f49-b9f4-86d049161286.png" 
              alt="Artefact Logo" 
              className="h-7 w-7 rounded bg-white/90" 
            />
          </div>
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-full hover:bg-gray-100",
          collapsed && "absolute -right-4 top-6 bg-white shadow-md border z-30"
        )}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  );
}

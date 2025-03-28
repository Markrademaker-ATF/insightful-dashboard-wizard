
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type SidebarHeaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export function SidebarHeader({ collapsed, setCollapsed }: SidebarHeaderProps) {
  return (
    <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} py-4 px-4`}>
      {!collapsed && (
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/c91593ad-aa3a-4f49-b9f4-86d049161286.png" 
            alt="Artefact Logo" 
            className="h-10" 
          />
        </div>
      )}
      {collapsed && (
        <div className="flex items-center justify-center w-full">
          <img 
            src="/lovable-uploads/c91593ad-aa3a-4f49-b9f4-86d049161286.png" 
            alt="Artefact Logo" 
            className="h-8" 
          />
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  );
}

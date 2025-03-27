
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hexagon } from "lucide-react";

type SidebarHeaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export function SidebarHeader({ collapsed, setCollapsed }: SidebarHeaderProps) {
  return (
    <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} py-4 px-4`}>
      {!collapsed && (
        <div className="flex items-center gap-2">
          <div className="bg-[#9b87f5] rounded-md w-8 h-8 flex items-center justify-center">
            <Hexagon className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-lg text-[#9b87f5]">Artefact</span>
        </div>
      )}
      {collapsed && (
        <div className="flex items-center justify-center w-full">
          <Hexagon className="h-6 w-6 text-[#9b87f5]" strokeWidth={2.5} />
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

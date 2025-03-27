
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
          <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
            <span className="text-primary-foreground font-bold">MA</span>
          </div>
          <span className="font-semibold text-lg">MarketAnalytics</span>
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

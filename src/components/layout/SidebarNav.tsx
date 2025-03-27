
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  LayoutDashboard, 
  Radio, 
  Layers, 
  GitCompare, 
  TrendingUp, 
  PieChart, 
  Settings, 
  HelpCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Data Overview",
    href: "/data",
    icon: Layers,
  },
  {
    title: "Channel Analysis",
    href: "/channels",
    icon: Radio,
  },
  {
    title: "Metric Comparison",
    href: "/metrics",
    icon: GitCompare,
  },
  {
    title: "Channel Details",
    href: "/channel-details",
    icon: BarChart3,
  },
  {
    title: "Incremental Analysis",
    href: "/incremental",
    icon: TrendingUp,
  },
  {
    title: "Budget Optimizer",
    href: "/budget",
    icon: PieChart,
  },
  {
    title: "Guide",
    href: "/guide",
    icon: HelpCircle,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function SidebarNav() {
  const location = useLocation();
  
  return (
    <div className="flex flex-col gap-1 w-full py-4">
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={index}
            to={item.href}
            className={cn(
              "nav-link group",
              isActive ? "active" : ""
            )}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-sm">{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
}

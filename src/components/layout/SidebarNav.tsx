
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  LineChart,
  Radio, 
  Layers, 
  GitCompare, 
  TrendingUp, 
  PieChart, 
  Settings, 
  HelpCircle,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  FileBarChart,
  Lightbulb,
  Home,
  Rocket,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href?: string;
  icon: React.ElementType;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Getting Started",
    href: "/getting-started",
    icon: Rocket,
  },
  {
    title: "Overview",
    icon: LayoutDashboard,
    children: [
      {
        title: "Analytics Overview",
        href: "/analytics",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics Methodologies",
        href: "/methodologies",
        icon: Lightbulb,
      },
      {
        title: "Data Overview",
        href: "/data",
        icon: Layers,
      },
    ]
  },
  {
    title: "Analysis",
    icon: BarChart3,
    children: [
      {
        title: "Exploratory Data Analysis",
        href: "/metrics",
        icon: FileBarChart,
      },
      {
        title: "Incremental Analysis",
        href: "/incremental",
        icon: TrendingUp,
      },
      {
        title: "Channel Analysis",
        href: "/channels",
        icon: Radio,
      },
      {
        title: "Campaign Analysis",
        href: "/campaign",
        icon: BarChart3,
      },
    ]
  },
  {
    title: "Budget Optimizer",
    href: "/budget",
    icon: PieChart,
  },
  {
    title: "A/B Testing",
    href: "/ab-testing",
    icon: LineChart,
  },
  {
    title: "Chat AI Assistant",
    href: "/chat-ai",
    icon: Bot,
  },
  {
    title: "Help & Resources",
    icon: HelpCircle,
    children: [
      {
        title: "Pages Guide",
        href: "/guide",
        icon: Layers,
      },
      {
        title: "Metrics Guide",
        href: "/metrics-guide",
        icon: FileBarChart,
      },
      {
        title: "FAQ",
        href: "/faq",
        icon: HelpCircle,
      },
    ]
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function SidebarNav() {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "Overview": true,
    "Analysis": true,
    "Help & Resources": true
  });
  
  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupTitle]: !prev[groupTitle]
    }));
  };
  
  return (
    <div className="flex flex-col gap-1 w-full py-4">
      {navItems.map((item, index) => {
        // Check if item has children (is a group)
        if (item.children) {
          const isExpanded = expandedGroups[item.title];
          const hasActiveChild = item.children.some(child => location.pathname === child.href);
          
          return (
            <div key={index} className="mb-2">
              <button
                onClick={() => toggleGroup(item.title)}
                className={cn(
                  "nav-link group w-full flex justify-between",
                  hasActiveChild ? "text-primary" : ""
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {isExpanded && (
                <div className="ml-6 mt-1 flex flex-col gap-1 border-l pl-2 border-border/50">
                  {item.children.map((child, childIndex) => {
                    const isActive = location.pathname === child.href;
                    return (
                      <Link
                        key={`${index}-${childIndex}`}
                        to={child.href || "#"}
                        className={cn(
                          "nav-link group",
                          isActive ? "active" : ""
                        )}
                        style={{
                          animationDelay: `${(index + childIndex) * 50}ms`,
                        }}
                      >
                        <child.icon className="h-4 w-4" />
                        <span className="text-sm">{child.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        } else {
          // Regular menu item without children
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href || "#"}
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
        }
      })}
    </div>
  );
}

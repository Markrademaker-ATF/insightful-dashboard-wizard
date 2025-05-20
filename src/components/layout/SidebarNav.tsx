import React from "react";
import {
  BarChart,
  Settings,
  LayoutDashboard,
  ListChecks,
  Plus,
  KanbanSquare,
  Users,
  Bell,
  HelpCircle,
  BarChart3,
  Layers,
  Target as TargetIcon,
  TrendingUp,
  SplitSquareHorizontal,
  Activity
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

interface NavGroupProps {
  title: string;
  items: NavItemProps[];
}

const NavItem = ({ href, title, icon }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  const navigate = useNavigate();

  return (
    <li>
      <Button
        variant="ghost"
        className={cn(
          "justify-start px-4",
          isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
        )}
        onClick={() => {
          navigate(href);
        }}
      >
        {icon}
        <span>{title}</span>
      </Button>
    </li>
  );
};

const NavGroup = ({ title, items }: NavGroupProps) => {
  return (
    <li>
      <span className="text-sm text-muted-foreground px-4">{title}</span>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <NavItem key={item.href} href={item.href} title={item.title} icon={item.icon} />
        ))}
      </ul>
    </li>
  );
};

export function SidebarNav() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Getting Started",
      items: [
        {
          title: "Dashboard",
          href: "/",
          icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
        },
        {
          title: "Tasks",
          href: "/tasks",
          icon: <ListChecks className="h-4 w-4 mr-2" />,
        },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          title: "Add New",
          href: "/projects/new",
          icon: <Plus className="h-4 w-4 mr-2" />,
        },
        {
          title: "Kanban",
          href: "/projects/kanban",
          icon: <KanbanSquare className="h-4 w-4 mr-2" />,
        },
      ],
    },
    {
      title: "Team",
      items: [
        {
          title: "Members",
          href: "/team",
          icon: <Users className="h-4 w-4 mr-2" />,
        },
      ],
    },
    {
      title: "Marketing Analytics",
      items: [
        {
          title: "Analytics Overview",
          href: "/analytics",
          icon: <BarChart className="h-4 w-4 mr-2" />,
        },
        {
          title: "Channels",
          href: "/channels",
          icon: <Layers className="h-4 w-4 mr-2" />,
        },
        {
          title: "Campaigns",
          href: "/campaigns",
          icon: <TargetIcon className="h-4 w-4 mr-2" />,
        },
        {
          title: "Incremental Analysis",
          href: "/incremental",
          icon: <TrendingUp className="h-4 w-4 mr-2" />,
        },
        {
          title: "A/B Testing",
          href: "/ab-testing",
          icon: <SplitSquareHorizontal className="h-4 w-4 mr-2" />,
        },
        {
          title: "Incrementality Tests",
          href: "/incrementality-test",
          icon: <Activity className="h-4 w-4 mr-2" />,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full space-y-4 py-4">
      <ScrollArea className="flex-1 px-3">
        <ul className="space-y-2">
          {items.map((group) => (
            <NavGroup key={group.title} title={group.title} items={group.items} />
          ))}
        </ul>
      </ScrollArea>
      <div className="pb-3 px-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-full px-2 justify-start text-muted-foreground data-[state=open]:bg-secondary">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <span>Olivia Martin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" forceMount className="w-[200px]">
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/login')}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="px-2">
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="pl-10 pr-6">
          <SheetTitle>Dashboard</SheetTitle>
          <SheetDescription>
            Manage your tasks, team members and projects.
          </SheetDescription>
        </SheetHeader>
        <SidebarNav />
      </SheetContent>
    </Sheet>
  )
}

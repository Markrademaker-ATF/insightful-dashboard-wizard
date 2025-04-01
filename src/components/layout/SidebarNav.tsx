import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Clock, 
  FileText, 
  MessageSquare, 
  Settings,
  Star,
  Calculator,
  Gauge,
  TrendingUp,
  ScatterChart
} from 'lucide-react';

// Model metrics data
const modelMetrics = {
  mta: {
    accuracy: 84.2,
    recency: 98.5,
    coverage: 76.8,
    granularity: 'User-level'
  },
  mmm: {
    accuracy: 92.1,
    coverage: 95.3,
    timeframe: 'Long-term',
    granularity: 'Channel-level' 
  }
};

export function SidebarNav() {
  return (
    <nav className="space-y-2">
      <div className="mb-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary",
              isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent/50"
            )
          }
        >
          <BarChart3 size={18} />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/performance"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary",
              isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent/50"
            )
          }
        >
          <LineChart size={18} />
          <span>Performance</span>
        </NavLink>

        <NavLink
          to="/attribution"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary",
              isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent/50"
            )
          }
        >
          <PieChart size={18} />
          <span>Attribution</span>
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary",
              isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent/50"
            )
          }
        >
          <Clock size={18} />
          <span>History</span>
        </NavLink>

        <NavLink
          to="/methodologies"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary",
              isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent/50"
            )
          }
        >
          <Calculator size={18} />
          <span>Methodologies</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary",
              isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent/50"
            )
          }
        >
          <FileText size={18} />
          <span>Reports</span>
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary",
              isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent/50"
            )
          }
        >
          <MessageSquare size={18} />
          <span>Chat</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary",
              isActive ? "bg-accent text-primary" : "text-muted-foreground hover:bg-accent/50"
            )
          }
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </div>

      {/* Divider */}
      <div className="border-t border-border/50 pt-2">
        <div className="px-3 py-1 text-xs font-semibold text-muted-foreground">MODEL METRICS</div>
      </div>

      {/* Model Metrics Section */}
      <div className="px-3 pb-2">
        {/* MTA Metrics */}
        <div className="mb-3 bg-accent/30 rounded-md p-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <ScatterChart size={16} className="text-purple-500" />
              <span className="text-xs font-medium">MTA Model</span>
            </div>
            <div className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
              User-level
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Accuracy</span>
              <span className="text-xs font-medium">{modelMetrics.mta.accuracy}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Recency</span>
              <span className="text-xs font-medium">{modelMetrics.mta.recency}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Coverage</span>
              <span className="text-xs font-medium">{modelMetrics.mta.coverage}%</span>
            </div>
          </div>
        </div>
        
        {/* MMM Metrics */}
        <div className="bg-accent/30 rounded-md p-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-500" />
              <span className="text-xs font-medium">MMM Model</span>
            </div>
            <div className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
              Channel-level
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Accuracy</span>
              <span className="text-xs font-medium">{modelMetrics.mmm.accuracy}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Coverage</span>
              <span className="text-xs font-medium">{modelMetrics.mmm.coverage}%</span>
            </div>
            <div className="flex items-center justify-between col-span-2">
              <span className="text-xs text-muted-foreground">Timeframe</span>
              <span className="text-xs font-medium">{modelMetrics.mmm.timeframe}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

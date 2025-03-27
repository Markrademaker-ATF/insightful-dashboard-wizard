
import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon, BarChart3, TableIcon } from "lucide-react";

interface PerformanceBreakdownHeaderProps {
  view: 'chart' | 'table';
  setView: (view: 'chart' | 'table') => void;
}

export function PerformanceBreakdownHeader({ view, setView }: PerformanceBreakdownHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Performance Breakdown</CardTitle>
        <CardDescription>Contribution to revenue by media type</CardDescription>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex border rounded-md">
          <Button
            variant={view === 'chart' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-r-none"
            onClick={() => setView('chart')}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            Chart
          </Button>
          <Button
            variant={view === 'table' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-l-none"
            onClick={() => setView('table')}
          >
            <TableIcon className="h-4 w-4 mr-1" />
            Table
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <DownloadIcon className="h-4 w-4 mr-1" />
          Export
        </Button>
      </div>
    </CardHeader>
  );
}

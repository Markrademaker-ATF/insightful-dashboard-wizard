import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  PerformanceBreakdownHeader, 
  PerformanceBreakdownTable, 
  PerformanceBreakdownChart 
} from "./performance-breakdown";

// Define colors for each media type - keeping this here for reference
export const mediaTypeColors = {
  paid: "#4361ee",
  organic: "#3a0ca3",
  nonPaid: "#7209b7",
  baseline: "#f72585",
  total: "#000000"
};

export const channelColors = {
  search: "#4361ee",
  social: "#3a0ca3",
  display: "#7209b7",
  video: "#f72585",
  email: "#4cc9f0",
  affiliates: "#480ca8",
};

type PerformanceBreakdownSectionProps = {
  data: any[];
  loading: boolean;
};

export function PerformanceBreakdownSection({ data, loading }: PerformanceBreakdownSectionProps) {
  const [view, setView] = useState<'chart' | 'table'>('chart');

  return (
    <Card className="mb-8">
      <PerformanceBreakdownHeader view={view} setView={setView} />
      <CardContent>
        {loading ? (
          <Skeleton className="w-full h-[400px]" />
        ) : (
          <>
            {view === 'chart' ? (
              <PerformanceBreakdownChart data={data} loading={loading} />
            ) : (
              <PerformanceBreakdownTable data={data} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

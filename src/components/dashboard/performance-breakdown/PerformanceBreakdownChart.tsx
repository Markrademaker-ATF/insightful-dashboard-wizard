
import React from "react";
import { EnhancedWaterfallChart } from "../EnhancedWaterfallChart";

interface PerformanceBreakdownChartProps {
  data: any[];
  loading: boolean;
}

export function PerformanceBreakdownChart({ data, loading }: PerformanceBreakdownChartProps) {
  return (
    <div className="space-y-6">
      {/* Enhanced Waterfall Chart - now horizontal */}
      <EnhancedWaterfallChart
        data={data}
        loading={loading}
        height={450}
      />
      
      <div className="text-sm text-muted-foreground mt-4">
        <p className="text-xs italic text-center">
          Click on a category bar to expand and see channel breakdown. Values show cumulative contribution.
        </p>
      </div>
    </div>
  );
}

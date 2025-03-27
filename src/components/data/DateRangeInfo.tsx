
import React from "react";
import { Calendar } from "lucide-react";

type DateRangeInfoProps = {
  dateInfo: {
    startDate: string;
    endDate: string;
    totalDataPoints: number;
    dataGranularity: string;
  } | null;
  timeframe: string;
  loading: boolean;
};

export function DateRangeInfo({ dateInfo, timeframe, loading }: DateRangeInfoProps) {
  if (!dateInfo || loading) return null;

  return (
    <div className="mb-6 bg-muted/30 p-4 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Date Range: <span className="font-medium">{dateInfo.startDate} to {dateInfo.endDate}</span>
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <span className="text-sm text-muted-foreground">
          <span className="font-medium">{dateInfo.totalDataPoints}</span> data points
        </span>
        <span className="text-sm text-muted-foreground">
          Granularity: <span className="font-medium capitalize">{dateInfo.dataGranularity}</span>
        </span>
        <span className="text-sm text-muted-foreground">
          Timeframe: <span className="font-medium">{timeframe === '7d' ? '7 Days' : timeframe === '30d' ? '30 Days' : '90 Days'}</span>
        </span>
      </div>
    </div>
  );
}

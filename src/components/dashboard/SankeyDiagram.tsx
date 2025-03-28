
import React from "react";
import { ResponsiveContainer, Sankey, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SankeyNode = {
  name: string;
  value?: number;
  fill?: string;
};

type SankeyLink = {
  source: number;
  target: number;
  value: number;
  fill?: string;
};

type SankeyData = {
  nodes: SankeyNode[];
  links: SankeyLink[];
};

interface SankeyDiagramProps {
  data: SankeyData;
  loading?: boolean;
  height?: number;
  className?: string;
}

export function SankeyDiagram({
  data,
  loading = false,
  height = 400,
  className,
}: SankeyDiagramProps) {
  if (loading) {
    return (
      <div className={cn("w-full animate-pulse", className)} style={{ height }}>
        <div className="h-full w-full bg-muted rounded-md"></div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          node={{
            padding: 50,
          }}
          link={{
            stroke: "transparent",
          }}
          margin={{
            top: 20,
            right: 180,
            bottom: 20,
            left: 40,
          }}
        >
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-sm shadow-xl">
                    <p className="font-medium">
                      {data.source?.name} → {data.target?.name}
                    </p>
                    <p className="text-muted-foreground pt-1">
                      Value: ${Number(data.value).toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}


import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";

type BudgetAllocationProps = {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  loading?: boolean;
};

export function BudgetAllocationChart({ data, loading = false }: BudgetAllocationProps) {
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-muted animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            animationDuration={750}
            animationBegin={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "0.5rem",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              border: "none",
              padding: "8px 12px",
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Budget"]}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            formatter={(value, entry, index) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

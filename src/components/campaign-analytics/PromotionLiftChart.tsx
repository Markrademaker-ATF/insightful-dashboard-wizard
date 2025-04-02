
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

// Mock data for the promotional lift chart
const data = [
  { name: "Jan", baseline: 180000, actual: 185000 },
  { name: "Feb", baseline: 175000, actual: 172000 },
  { name: "Mar", baseline: 185000, actual: 210000 },
  { name: "Apr", baseline: 190000, actual: 250000 },
  { name: "May", baseline: 195000, actual: 300000 },
  { name: "Jun", baseline: 200000, actual: 310000 },
  { name: "Jul", baseline: 205000, actual: 320000 },
  { name: "Aug", baseline: 210000, actual: 290000 },
  { name: "Sep", baseline: 205000, actual: 240000 },
  { name: "Oct", baseline: 200000, actual: 220000 },
  { name: "Nov", baseline: 215000, actual: 280000 },
  { name: "Dec", baseline: 220000, actual: 350000 },
];

// Calculate total lift
const totalBaseline = data.reduce((sum, item) => sum + item.baseline, 0);
const totalActual = data.reduce((sum, item) => sum + item.actual, 0);
const totalLift = totalActual - totalBaseline;
const liftPercentage = (totalLift / totalBaseline) * 100;

export const PromotionLiftChart = () => {
  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="text-xs text-muted-foreground">Baseline Revenue</div>
          <div className="text-lg font-semibold">${(totalBaseline / 1000000).toFixed(2)}M</div>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="text-xs text-muted-foreground">Actual Revenue</div>
          <div className="text-lg font-semibold">${(totalActual / 1000000).toFixed(2)}M</div>
        </div>
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-xs text-green-700">Incremental Lift</div>
          <div className="text-lg font-semibold text-green-700">
            +${(totalLift / 1000000).toFixed(2)}M ({liftPercentage.toFixed(1)}%)
          </div>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value/1000}k`} />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              labelFormatter={(label) => `${label}`}
            />
            <Legend />
            <Bar dataKey="baseline" name="Baseline Revenue" stackId="a" fill="#94a3b8" />
            <Bar dataKey="actual" name="Actual Revenue" stackId="b" fill="#10b981" />
            <ReferenceLine y={0} stroke="#000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

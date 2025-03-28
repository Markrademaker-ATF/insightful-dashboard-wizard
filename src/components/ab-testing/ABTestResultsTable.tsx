
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ABTest } from "@/hooks/useMockABTestData";
import { CheckSquare, ArrowUp, ArrowDown, Trophy } from "lucide-react";

interface ABTestResultsTableProps {
  test: ABTest;
  loading: boolean;
}

export function ABTestResultsTable({ test, loading }: ABTestResultsTableProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  // Find the control variant
  const controlVariant = test.variants.find(v => v.isControl);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/60">
            <TableHead className="font-semibold">Variant</TableHead>
            <TableHead className="text-right font-semibold">Visitors</TableHead>
            <TableHead className="text-right font-semibold">Conversions</TableHead>
            <TableHead className="text-right font-semibold">Conv. Rate</TableHead>
            <TableHead className="text-right font-semibold">Revenue</TableHead>
            <TableHead className="text-right font-semibold">vs. Control</TableHead>
            <TableHead className="text-right font-semibold">Confidence</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {test.variants.map((variant) => {
            const isWinner = test.winner === variant.id;
            const vsControl = !variant.isControl && controlVariant
              ? ((variant.conversionRate - controlVariant.conversionRate) / controlVariant.conversionRate) * 100
              : null;
            
            return (
              <TableRow 
                key={variant.id} 
                className={`${isWinner ? "bg-green-50/60" : "hover:bg-muted/20"} transition-colors`}
              >
                <TableCell className="font-medium flex items-center gap-2">
                  {variant.name}
                  {variant.isControl && (
                    <Badge variant="outline" className="bg-muted/50">Control</Badge>
                  )}
                  {isWinner && (
                    <Badge className="bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-green-200 hover:bg-green-100 transition-colors flex items-center gap-1">
                      <Trophy className="h-3 w-3" /> Winner
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">{variant.visitors.toLocaleString()}</TableCell>
                <TableCell className="text-right">{variant.conversions.toLocaleString()}</TableCell>
                <TableCell className="text-right font-medium">{variant.conversionRate.toFixed(2)}%</TableCell>
                <TableCell className="text-right">${variant.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {variant.isControl ? (
                    "—"
                  ) : vsControl !== null ? (
                    <div className="flex items-center justify-end gap-1">
                      {vsControl > 0 ? (
                        <div className="flex items-center gap-1 text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                          <ArrowUp className="h-3 w-3 text-green-600" />
                          <span>{vsControl.toFixed(1)}%</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded-full">
                          <ArrowDown className="h-3 w-3 text-red-600" />
                          <span>{Math.abs(vsControl).toFixed(1)}%</span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </TableCell>
                <TableCell className="text-right">
                  {variant.confidenceLevel ? (
                    <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium 
                      ${variant.confidenceLevel >= 95 ? 'bg-green-50 text-green-600' : 
                      variant.confidenceLevel >= 80 ? 'bg-amber-50 text-amber-600' : 
                      'bg-gray-50 text-gray-600'}`}>
                      {variant.confidenceLevel.toFixed(1)}%
                    </div>
                  ) : "—"}
                </TableCell>
                <TableCell>
                  {isWinner && (
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center ml-auto">
                      <CheckSquare className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

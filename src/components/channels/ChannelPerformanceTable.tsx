
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type ChannelPerformanceTableProps = {
  data: any[];
  loading: boolean;
};

export function ChannelPerformanceTable({ data, loading }: ChannelPerformanceTableProps) {
  if (loading) {
    return (
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Channel</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="text-right">ROAS</TableHead>
              <TableHead className="text-right">Conversion</TableHead>
              <TableHead className="text-right">CPA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5).fill(0).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-[80px] ml-auto" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-[70px] ml-auto" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-[60px] ml-auto" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-4 w-[60px] ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Channel</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Cost</TableHead>
            <TableHead className="text-right">ROAS</TableHead>
            <TableHead className="text-right">Conversion %</TableHead>
            <TableHead className="text-right">CPA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((channel) => (
            <TableRow key={channel.id}>
              <TableCell className="font-medium">{channel.name}</TableCell>
              <TableCell className="text-right">${channel.revenue.toLocaleString()}</TableCell>
              <TableCell className="text-right">${channel.cost.toLocaleString()}</TableCell>
              <TableCell className="text-right">{channel.roas}x</TableCell>
              <TableCell className="text-right">{channel.conversion}%</TableCell>
              <TableCell className="text-right">${channel.cpa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

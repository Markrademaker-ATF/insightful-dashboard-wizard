
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Filter, ArrowDownToLine, FileDown, SlidersHorizontal, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

type FilterExportControlsProps = {
  onFilterChange?: (filters: any) => void;
  filterOptions?: {
    channels?: boolean;
    metrics?: boolean;
    date?: boolean;
  };
  className?: string;
};

export const FilterExportControls = ({ 
  onFilterChange, 
  filterOptions = { 
    channels: true, 
    metrics: true, 
    date: false 
  },
  className 
}: FilterExportControlsProps) => {
  const { toast } = useToast();
  const [channelFilters, setChannelFilters] = useState<string[]>([
    "search", "social", "display", "email"
  ]);
  const [metricFilters, setMetricFilters] = useState<string[]>([
    "revenue", "cost", "roas", "ctr", "conversion"
  ]);

  const channelOptions = [
    { id: "search", label: "Search" },
    { id: "social", label: "Social" },
    { id: "display", label: "Display" },
    { id: "email", label: "Email" },
    { id: "affiliate", label: "Affiliate" },
  ];

  const metricOptions = [
    { id: "revenue", label: "Revenue" },
    { id: "cost", label: "Cost" },
    { id: "roas", label: "ROAS" },
    { id: "conversion", label: "Conversion Rate" },
    { id: "cpa", label: "CPA" },
    { id: "ctr", label: "CTR" },
    { id: "impressions", label: "Impressions" },
    { id: "clicks", label: "Clicks" },
  ];

  const handleChannelFilterChange = (channel: string) => {
    setChannelFilters(prev => {
      if (prev.includes(channel)) {
        return prev.filter(c => c !== channel);
      } else {
        return [...prev, channel];
      }
    });
  };

  const handleMetricFilterChange = (metric: string) => {
    setMetricFilters(prev => {
      if (prev.includes(metric)) {
        return prev.filter(m => m !== metric);
      } else {
        return [...prev, metric];
      }
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "Export Started",
      description: "Your data is being prepared for download",
    });
    // In a real app, this would generate and download a CSV file
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your data has been exported successfully",
      });
    }, 1500);
  };

  const handleExportPDF = () => {
    toast({
      title: "PDF Export Started",
      description: "Your chart is being prepared as PDF",
    });
    // In a real app, this would generate and download a PDF file
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your chart has been exported as PDF",
      });
    }, 1500);
  };

  const handleExportImage = () => {
    toast({
      title: "Image Export Started",
      description: "Your chart is being prepared as PNG image",
    });
    // In a real app, this would generate and download a PNG file
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your chart has been exported as PNG",
      });
    }, 1500);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {filterOptions.channels && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 flex gap-1">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Channels</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-3">
            <h4 className="font-medium mb-2 text-sm">Channels</h4>
            <div className="space-y-2">
              {channelOptions.map((channel) => (
                <div key={channel.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`channel-${channel.id}`} 
                    checked={channelFilters.includes(channel.id)}
                    onCheckedChange={() => handleChannelFilterChange(channel.id)}
                  />
                  <Label 
                    htmlFor={`channel-${channel.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {channel.label}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}

      {filterOptions.metrics && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 flex gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Metrics</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52 p-3">
            <h4 className="font-medium mb-2 text-sm">Metrics</h4>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {metricOptions.map((metric) => (
                <div key={metric.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`metric-${metric.id}`} 
                    checked={metricFilters.includes(metric.id)}
                    onCheckedChange={() => handleMetricFilterChange(metric.id)}
                  />
                  <Label 
                    htmlFor={`metric-${metric.id}`} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {metric.label}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 flex gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="text-xs font-medium">Export Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleExportCSV} className="flex items-center gap-2 text-sm cursor-pointer">
            <FileDown className="h-4 w-4" />
            Export Data as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportPDF} className="flex items-center gap-2 text-sm cursor-pointer">
            <ArrowDownToLine className="h-4 w-4" />
            Export Chart as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportImage} className="flex items-center gap-2 text-sm cursor-pointer">
            <Download className="h-4 w-4" />
            Export Chart as PNG
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

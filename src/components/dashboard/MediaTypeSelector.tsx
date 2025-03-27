
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { mediaGroupColors } from "./MediaGroupBreakdownChart";

type MediaTypeSelectorProps = {
  activeType: string;
  onTypeChange: (type: string) => void;
};

export function MediaTypeSelector({ activeType, onTypeChange }: MediaTypeSelectorProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">Media Type Analysis</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Info className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p>Compare performance across different media types to understand incremental contribution.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Tabs
        defaultValue="all"
        value={activeType}
        onValueChange={onTypeChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All
          </TabsTrigger>
          <TabsTrigger value="paid" className="border-l-2" style={{ borderColor: mediaGroupColors.paid }}>
            Paid
          </TabsTrigger>
          <TabsTrigger value="organic" className="border-l-2" style={{ borderColor: mediaGroupColors.organic }}>
            Organic
          </TabsTrigger>
          <TabsTrigger value="nonPaid" className="border-l-2" style={{ borderColor: mediaGroupColors.nonPaid }}>
            Non-Paid
          </TabsTrigger>
          <TabsTrigger value="baseline" className="border-l-2" style={{ borderColor: mediaGroupColors.baseline }}>
            Baseline
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

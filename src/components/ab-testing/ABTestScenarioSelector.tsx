
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ABTest } from "@/hooks/useMockABTestData";
import { BeakerIcon } from "lucide-react";

interface ABTestScenarioSelectorProps {
  tests: ABTest[];
  selectedTestId: string;
  onSelectTest: (testId: string) => void;
  loading: boolean;
}

export function ABTestScenarioSelector({
  tests,
  selectedTestId,
  onSelectTest,
  loading
}: ABTestScenarioSelectorProps) {
  if (loading) {
    return (
      <Card className="border-none shadow-sm bg-gradient-to-br from-white to-primary/5">
        <CardContent className="p-4">
          <Skeleton className="h-10 w-[250px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-primary/5">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 to-primary/30"></div>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              <BeakerIcon className="h-4 w-4 text-primary" />
            </div>
            <div className="text-sm font-medium">Select A/B Test:</div>
          </div>
          <Select value={selectedTestId} onValueChange={onSelectTest}>
            <SelectTrigger className="w-[280px] border-border/40 focus:ring-primary/30 transition-colors">
              <SelectValue placeholder="Select a test" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur border-border/40">
              {tests.map((test) => (
                <SelectItem key={test.id} value={test.id} className="focus:bg-primary/10 focus:text-foreground hover:bg-primary/5">
                  {test.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

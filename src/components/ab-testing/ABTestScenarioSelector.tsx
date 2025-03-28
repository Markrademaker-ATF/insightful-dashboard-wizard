
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ABTest } from "@/hooks/useMockABTestData";
import { BarChart3 } from "lucide-react";

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
      <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-slate-100">
        <CardContent className="p-4">
          <Skeleton className="h-10 w-[300px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-amber-100/50 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-amber-100">
            <BarChart3 className="h-5 w-5 text-amber-700" />
          </div>
          <div className="text-base font-medium text-amber-900">Select A/B Test Scenario:</div>
          <Select value={selectedTestId} onValueChange={onSelectTest}>
            <SelectTrigger className="w-[300px] bg-white border-amber-200">
              <SelectValue placeholder="Select a test" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border-amber-200">
              {tests.map((test) => (
                <SelectItem key={test.id} value={test.id}>
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

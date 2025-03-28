
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ABTest } from "@/hooks/useMockABTestData";

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
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-10 w-[250px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium">Select A/B Test:</div>
          <Select value={selectedTestId} onValueChange={onSelectTest}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select a test" />
            </SelectTrigger>
            <SelectContent>
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

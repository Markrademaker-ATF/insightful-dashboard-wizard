
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  TrendingUp, 
  Layers 
} from "lucide-react";

const MethodologySelector = ({ 
  activeMethodology, 
  setActiveMethodology 
}: { 
  activeMethodology: string; 
  setActiveMethodology: (methodology: string) => void;
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Select a methodology for detailed technical background:</h3>
      <Tabs value={activeMethodology} onValueChange={setActiveMethodology} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mmm" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Marketing Mix Modeling</span>
          </TabsTrigger>
          <TabsTrigger value="incrementality" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Incrementality Testing</span>
          </TabsTrigger>
          <TabsTrigger value="mta" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Multi-Touch Attribution</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MethodologySelector;


import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type Section = {
  id: string;
  title: string;
};

interface SectionNavProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function SectionNav({ sections, activeSection, onSectionChange }: SectionNavProps) {
  const getSegmentColor = (index: number, currentIndex: number) => {
    return currentIndex >= index ? "bg-primary" : "bg-muted";
  };

  const currentIndex = sections.findIndex(s => s.id === activeSection);

  return (
    <div className="mb-6 overflow-hidden">
      <div className="flex flex-wrap justify-center gap-y-2 relative">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          const isPassed = sections.findIndex(s => s.id === activeSection) > index;
          const isOdd = index % 2 !== 0;
          
          return (
            <div key={section.id} className={cn(
              "flex items-center",
              isOdd ? "flex-row-reverse" : "flex-row",
              index === 0 ? "" : ""
            )}>
              {/* Section button */}
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                className={cn(
                  "flex items-center gap-2 rounded-full z-10 transition-all",
                  isPassed && !isActive ? "border-primary text-primary hover:bg-primary/10" : ""
                )}
                onClick={() => onSectionChange(section.id)}
              >
                <span className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
                  isActive ? "bg-white text-primary" : 
                  isPassed ? "bg-primary/10 text-primary" :
                  "bg-muted text-muted-foreground"
                )}>
                  {index + 1}
                </span>
                <span className="hidden md:inline">{section.title}</span>
              </Button>
              
              {/* Connecting line */}
              {index < sections.length - 1 && (
                <div className={cn(
                  "relative",
                  isOdd ? "order-2" : "order-last"
                )}>
                  <div className={cn(
                    "h-0.5 w-8 mx-1",
                    getSegmentColor(index, currentIndex)
                  )} />
                  
                  {/* Vertical connecting line for the snake effect */}
                  {index < sections.length - 2 && (
                    <div className="relative">
                      <div className={cn(
                        "absolute h-8 w-0.5 right-0",
                        isOdd ? "-top-4" : "top-0",
                        getSegmentColor(index, currentIndex)
                      )} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

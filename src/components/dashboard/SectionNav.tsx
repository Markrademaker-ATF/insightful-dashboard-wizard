
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex items-center min-w-max">
        {sections.map((section, index) => (
          <React.Fragment key={section.id}>
            {/* Connecting line before buttons (except first) */}
            {index > 0 && (
              <div 
                className={cn(
                  "h-0.5 w-6 mx-1", 
                  activeSection === section.id || 
                  activeSection === sections[index-1].id ||
                  sections.findIndex(s => s.id === activeSection) > index
                    ? "bg-primary" 
                    : "bg-muted"
                )}
              />
            )}
            
            {/* Section button */}
            <Button
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex items-center gap-2 rounded-full transition-all",
                sections.findIndex(s => s.id === activeSection) > index && !activeSection.includes(section.id)
                  ? "border-primary text-primary hover:bg-primary/10"
                  : ""
              )}
              onClick={() => onSectionChange(section.id)}
            >
              <span className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
                activeSection === section.id 
                  ? "bg-white text-primary" 
                  : sections.findIndex(s => s.id === activeSection) > index
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
              )}>
                {index + 1}
              </span>
              <span className="hidden md:inline">{section.title}</span>
            </Button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

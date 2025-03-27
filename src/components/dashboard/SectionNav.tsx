
import React from "react";
import { Button } from "@/components/ui/button";

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
      <div className="flex space-x-1 min-w-max">
        {sections.map((section, index) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-2 transition-all"
            onClick={() => onSectionChange(section.id)}
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-xs font-medium">
              {index + 1}
            </span>
            <span className="hidden md:inline">{section.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

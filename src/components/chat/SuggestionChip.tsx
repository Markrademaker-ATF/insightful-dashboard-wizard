
import React from "react";
import { ArrowRight } from "lucide-react";

type SuggestionChipProps = {
  query: string;
  onClick: () => void;
};

export function SuggestionChip({ query, onClick }: SuggestionChipProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-accent hover:bg-accent/80 text-accent-foreground transition-colors"
    >
      <span className="truncate max-w-[200px]">{query}</span>
      <ArrowRight className="h-3 w-3" />
    </button>
  );
}

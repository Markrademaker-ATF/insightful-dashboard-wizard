
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
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary/10 hover:bg-primary/20 text-primary transition-colors border border-primary/20 shadow-sm hover:shadow-md"
    >
      <span className="truncate max-w-[250px]">{query}</span>
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}


import React from "react";
import { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  icon?: LucideIcon;
};

export function PageHeader({ 
  title, 
  description, 
  children,
  actions,
  icon: Icon
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-6 w-6 text-primary" />}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-balance">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1 text-balance max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
      </div>
      {actions && <div className="w-full">{actions}</div>}
    </div>
  );
}

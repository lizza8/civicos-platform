import React from "react";

interface UrgencyBarProps {
  value: number;
}

export function UrgencyBar({ value }: UrgencyBarProps) {
  const getColor = () => {
    if (value >= 80) return "from-error to-accent";
    if (value >= 50) return "from-warning to-error";
    return "from-success to-warning";
  };

  return (
    <div className="space-y-2">
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getColor()} transition-all duration-slow rounded-full`}
          style={{
            width: `${value}%`,
            boxShadow: "0 0 12px currentColor",
          }}
        />
      </div>
      <div className="flex justify-between text-caption text-muted-foreground">
        <span>Low</span>
        <span className="text-foreground">{value}%</span>
        <span>Critical</span>
      </div>
    </div>
  );
}

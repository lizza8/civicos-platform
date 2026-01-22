import React from "react";

interface TrustMeterProps {
  value: number;
}

export function TrustMeter({ value }: TrustMeterProps) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (value / 100) * circumference;

  const getColor = () => {
    if (value >= 80) return "#00ff88";
    if (value >= 50) return "#00ffff";
    return "#ff0055";
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="hsl(230, 20%, 20%)"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke={getColor()}
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-slow"
            style={{
              filter: `drop-shadow(0 0 8px ${getColor()})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-h4 text-foreground">{value}</span>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-body text-foreground mb-1">Trust Score</p>
        <p className="text-body-sm text-muted-foreground">
          {value >= 80
            ? "Highly Trusted"
            : value >= 50
            ? "Verified"
            : "Needs Verification"}
        </p>
      </div>
    </div>
  );
}

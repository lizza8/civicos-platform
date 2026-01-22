import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, AlertTriangle, TrendingUp, MapPin, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";

export function AIIntelligence() {
  const [insights, setInsights] = useState({
    globalSummary: "",
    emergingHotspots: [] as any[],
    unmatchedNeeds: [] as any[],
    resourceSurplus: [] as any[],
    predictions: [] as any[],
    lastUpdated: new Date(),
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadInsights = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setInsights({
        globalSummary:
          "Current global analysis shows 342 active needs across 67 countries. Medical supplies remain the highest priority category (34%), followed by food distribution (28%) and shelter (21%). Response times have improved by 15% this week. Critical hotspots detected in 3 regions requiring immediate attention.",
        emergingHotspots: [
          {
            location: "São Paulo, Brazil",
            category: "Water",
            urgency: 98,
            trend: "escalating",
            affectedPopulation: "~50,000",
          },
          {
            location: "Mumbai, India",
            category: "Medical",
            urgency: 92,
            trend: "stable",
            affectedPopulation: "~30,000",
          },
          {
            location: "Cairo, Egypt",
            category: "Food",
            urgency: 85,
            trend: "improving",
            affectedPopulation: "~20,000",
          },
        ],
        unmatchedNeeds: [
          {
            category: "Medical Specialists",
            count: 23,
            avgUrgency: 88,
            locations: ["Paris", "Tokyo", "New York"],
          },
          {
            category: "Heavy Transport",
            count: 15,
            avgUrgency: 76,
            locations: ["Sydney", "London", "Berlin"],
          },
          {
            category: "Water Purification",
            count: 12,
            avgUrgency: 94,
            locations: ["São Paulo", "Lagos", "Jakarta"],
          },
        ],
        resourceSurplus: [
          {
            category: "Food Distribution",
            count: 45,
            locations: ["San Francisco", "Toronto", "Amsterdam"],
          },
          {
            category: "Tech Support",
            count: 38,
            locations: ["Seattle", "Austin", "Singapore"],
          },
          {
            category: "Education",
            count: 29,
            locations: ["Boston", "Melbourne", "Stockholm"],
          },
        ],
        predictions: [
          {
            insight: "Medical supply needs likely to increase by 20% in next 48 hours",
            confidence: 87,
            timeframe: "48 hours",
          },
          {
            insight: "Transport assistance demand expected to peak this weekend",
            confidence: 79,
            timeframe: "3 days",
          },
          {
            insight: "Food distribution capacity will exceed demand in North America",
            confidence: 92,
            timeframe: "1 week",
          },
        ],
        lastUpdated: new Date(),
      });
      setIsRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    loadInsights();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-6 h-6" strokeWidth={2} />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary animate-pulse" strokeWidth={2} />
              <h1 className="text-h1 text-foreground">AI Global Intelligence</h1>
            </div>
          </div>
          <Button
            onClick={loadInsights}
            disabled={isRefreshing}
            className="bg-gradient-primary text-primary-foreground hover:opacity-90 border-0 shadow-glow"
          >
            <RefreshCw
              className={`w-5 h-5 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              strokeWidth={2}
            />
            Refresh Analysis
          </Button>
        </div>

        <div className="glassmorphism neon-border rounded-lg p-8 mb-6">
          <h2 className="text-h3 text-foreground mb-4 flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" strokeWidth={2} />
            Global Situation Summary
          </h2>
          <p className="text-body text-foreground leading-relaxed">{insights.globalSummary}</p>
          <p className="text-caption text-muted-foreground mt-4">
            Last updated: {insights.lastUpdated.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="glassmorphism neon-border rounded-lg p-6">
            <h2 className="text-h3 text-foreground mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-error" strokeWidth={2} />
              Emerging Hotspots
            </h2>
            <div className="space-y-4">
              {insights.emergingHotspots.map((hotspot, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-error/10 border border-error hover:border-error/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-error" strokeWidth={2} />
                      <div>
                        <p className="text-body text-foreground font-medium">
                          {hotspot.location}
                        </p>
                        <p className="text-body-sm text-muted-foreground">
                          {hotspot.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-h4 text-error">{hotspot.urgency}</p>
                      <p className="text-caption text-muted-foreground">urgency</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-muted-foreground">
                      Affected: {hotspot.affectedPopulation}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full ${
                        hotspot.trend === "escalating"
                          ? "bg-error/20 text-error"
                          : hotspot.trend === "stable"
                          ? "bg-warning/20 text-warning"
                          : "bg-success/20 text-success"
                      }`}
                    >
                      {hotspot.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glassmorphism neon-border rounded-lg p-6">
            <h2 className="text-h3 text-foreground mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" strokeWidth={2} />
              AI Predictions
            </h2>
            <div className="space-y-4">
              {insights.predictions.map((prediction, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-primary/10 border border-primary hover:border-primary/50 transition-colors"
                >
                  <p className="text-body text-foreground mb-3">{prediction.insight}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary"
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                      <span className="text-body-sm text-primary">
                        {prediction.confidence}% confidence
                      </span>
                    </div>
                    <span className="text-body-sm text-muted-foreground">
                      {prediction.timeframe}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glassmorphism neon-border rounded-lg p-6">
            <h2 className="text-h3 text-foreground mb-6">Unmatched Urgent Needs</h2>
            <div className="space-y-3">
              {insights.unmatchedNeeds.map((need, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-body text-foreground font-medium">{need.category}</p>
                    <span className="text-body-sm text-error">{need.count} unmatched</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm text-muted-foreground">
                    <span>Avg urgency: {need.avgUrgency}</span>
                    <span>{need.locations.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glassmorphism neon-border rounded-lg p-6">
            <h2 className="text-h3 text-foreground mb-6">Resource Surplus Zones</h2>
            <div className="space-y-3">
              {insights.resourceSurplus.map((resource, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-muted/30 border border-border hover:border-success transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-body text-foreground font-medium">{resource.category}</p>
                    <span className="text-body-sm text-success">{resource.count} available</span>
                  </div>
                  <p className="text-body-sm text-muted-foreground">
                    {resource.locations.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Users, MapPin, Clock } from "lucide-react";
import { Button } from "../components/ui/button";

export function Dashboard() {
  const [stats, setStats] = useState({
    totalNodes: 0,
    activeNeeds: 0,
    availableHelp: 0,
    matchesThisWeek: 0,
    resolvedToday: 0,
    avgResponseTime: "0m",
    topCategories: [] as { name: string; count: number }[],
    recentActivity: [] as any[],
  });

  useEffect(() => {
    // Simulate loading dashboard data
    setStats({
      totalNodes: 1247,
      activeNeeds: 342,
      availableHelp: 905,
      matchesThisWeek: 156,
      resolvedToday: 23,
      avgResponseTime: "12m",
      topCategories: [
        { name: "Medical", count: 234 },
        { name: "Food", count: 189 },
        { name: "Shelter", count: 156 },
        { name: "Transport", count: 98 },
      ],
      recentActivity: [
        { type: "match", location: "New York, USA", time: "2m ago" },
        { type: "resolved", location: "London, UK", time: "5m ago" },
        { type: "need", location: "Tokyo, Japan", time: "8m ago" },
        { type: "help", location: "Sydney, Australia", time: "12m ago" },
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-6 h-6" strokeWidth={2} />
            </Button>
          </Link>
          <h1 className="text-h1 text-foreground">Mission Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glassmorphism neon-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-caption uppercase tracking-wider text-muted-foreground">
                Total Nodes
              </h3>
              <TrendingUp className="w-5 h-5 text-primary" strokeWidth={2} />
            </div>
            <p className="text-h2 text-foreground">{stats.totalNodes}</p>
            <p className="text-body-sm text-success mt-2">+12% from last week</p>
          </div>

          <div className="glassmorphism neon-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-caption uppercase tracking-wider text-muted-foreground">
                Active Needs
              </h3>
              <Users className="w-5 h-5 text-error" strokeWidth={2} />
            </div>
            <p className="text-h2 text-foreground">{stats.activeNeeds}</p>
            <p className="text-body-sm text-error mt-2">Requires attention</p>
          </div>

          <div className="glassmorphism neon-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-caption uppercase tracking-wider text-muted-foreground">
                Available Help
              </h3>
              <Users className="w-5 h-5 text-success" strokeWidth={2} />
            </div>
            <p className="text-h2 text-foreground">{stats.availableHelp}</p>
            <p className="text-body-sm text-success mt-2">Ready to assist</p>
          </div>

          <div className="glassmorphism neon-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-caption uppercase tracking-wider text-muted-foreground">
                Matches This Week
              </h3>
              <Clock className="w-5 h-5 text-primary" strokeWidth={2} />
            </div>
            <p className="text-h2 text-foreground">{stats.matchesThisWeek}</p>
            <p className="text-body-sm text-primary mt-2">Avg: {stats.avgResponseTime}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glassmorphism neon-border rounded-lg p-6">
            <h2 className="text-h3 text-foreground mb-6">Top Categories</h2>
            <div className="space-y-4">
              {stats.topCategories.map((category, index) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-body text-foreground">{category.name}</span>
                    <span className="text-body-sm text-primary">{category.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary"
                      style={{
                        width: `${(category.count / stats.topCategories[0].count) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glassmorphism neon-border rounded-lg p-6">
            <h2 className="text-h3 text-foreground mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-border"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "match"
                        ? "bg-primary"
                        : activity.type === "resolved"
                        ? "bg-success"
                        : activity.type === "need"
                        ? "bg-error"
                        : "bg-success"
                    } animate-pulse`}
                  />
                  <MapPin className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
                  <div className="flex-1">
                    <p className="text-body-sm text-foreground">{activity.location}</p>
                    <p className="text-caption text-muted-foreground capitalize">
                      {activity.type}
                    </p>
                  </div>
                  <span className="text-caption text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

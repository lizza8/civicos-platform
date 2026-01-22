import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Award, CheckCircle, Edit } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";

export function Profile() {
  const [user, setUser] = useState({
    name: "Anonymous User",
    skills: ["Medical", "Transport", "Translation"],
    trustScore: 75,
    verified: false,
    actionsCompleted: 23,
    availability: true,
    location: "New York, USA",
    joinedDate: "2024-01-15",
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-6 h-6" strokeWidth={2} />
            </Button>
          </Link>
          <h1 className="text-h1 text-foreground">Cyber ID Profile</h1>
        </div>

        <div className="glassmorphism neon-border rounded-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-h2 font-medium shadow-glow">
                {user.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-h2 text-foreground mb-2">{user.name}</h2>
                <p className="text-body text-muted-foreground mb-3">{user.location}</p>
                <div className="flex items-center gap-3">
                  {user.verified && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/20 border border-success">
                      <CheckCircle className="w-4 h-4 text-success" strokeWidth={2} />
                      <span className="text-caption text-success">Verified</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary">
                    <Award className="w-4 h-4 text-primary" strokeWidth={2} />
                    <span className="text-caption text-primary">
                      {user.actionsCompleted} Actions
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="bg-transparent text-primary border-primary hover:bg-primary/10"
            >
              <Edit className="w-4 h-4 mr-2" strokeWidth={2} />
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-caption uppercase tracking-wider text-muted-foreground mb-4">
                Trust Score
              </h3>
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(230, 20%, 20%)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(185, 100%, 50%)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 56}
                    strokeDashoffset={2 * Math.PI * 56 * (1 - user.trustScore / 100)}
                    strokeLinecap="round"
                    style={{
                      filter: "drop-shadow(0 0 8px hsl(185, 100%, 50%))",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-h2 text-foreground">{user.trustScore}</span>
                </div>
              </div>
              <p className="text-body-sm text-muted-foreground">
                Trust score increases with verified actions and community validation
              </p>
            </div>

            <div>
              <h3 className="text-caption uppercase tracking-wider text-muted-foreground mb-4">
                Skills & Resources
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {user.skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 rounded-full bg-primary/20 border border-primary text-primary text-body-sm"
                  >
                    {skill}
                  </div>
                ))}
                {isEditing && (
                  <button className="px-4 py-2 rounded-full border-2 border-dashed border-primary text-primary text-body-sm hover:bg-primary/10 transition-colors">
                    + Add Skill
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                  <div>
                    <p className="text-body text-foreground mb-1">Availability Status</p>
                    <p className="text-body-sm text-muted-foreground">
                      {user.availability ? "Available to help" : "Currently unavailable"}
                    </p>
                  </div>
                  <Switch
                    checked={user.availability}
                    onCheckedChange={(checked) =>
                      setUser({ ...user, availability: checked })
                    }
                  />
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border">
                  <p className="text-body text-foreground mb-1">Member Since</p>
                  <p className="text-body-sm text-muted-foreground">
                    {new Date(user.joinedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glassmorphism neon-border rounded-lg p-8">
          <h2 className="text-h3 text-foreground mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                action: "Helped with medical supplies",
                location: "New York, USA",
                time: "2 hours ago",
                impact: "+3 Trust",
              },
              {
                action: "Verified shelter report",
                location: "Boston, USA",
                time: "1 day ago",
                impact: "+1 Trust",
              },
              {
                action: "Resolved transport need",
                location: "Philadelphia, USA",
                time: "3 days ago",
                impact: "+5 Trust",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Shield className="w-5 h-5 text-primary" strokeWidth={2} />
                  <div>
                    <p className="text-body text-foreground">{activity.action}</p>
                    <p className="text-body-sm text-muted-foreground">
                      {activity.location} • {activity.time}
                    </p>
                  </div>
                </div>
                <span className="text-body-sm text-success">{activity.impact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

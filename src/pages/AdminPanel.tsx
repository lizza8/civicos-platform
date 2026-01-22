import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, Eye } from "lucide-react";
import { Button } from "../components/ui/button";

export function AdminPanel() {
  const [reports, setReports] = useState([
    {
      id: "1",
      type: "need",
      category: "Medical",
      location: "New York, USA",
      urgency: 95,
      status: "pending",
      flagged: true,
      reason: "Duplicate report detected",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "2",
      type: "help",
      category: "Food",
      location: "London, UK",
      urgency: 60,
      status: "verified",
      flagged: false,
      reason: null,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: "3",
      type: "need",
      category: "Shelter",
      location: "Tokyo, Japan",
      urgency: 88,
      status: "pending",
      flagged: true,
      reason: "Suspicious activity pattern",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
  ]);

  const handleVerify = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "verified", flagged: false } : r))
    );
  };

  const handleReject = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const flaggedCount = reports.filter((r) => r.flagged).length;

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-6 h-6" strokeWidth={2} />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" strokeWidth={2} />
            <h1 className="text-h1 text-foreground">System Control</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glassmorphism neon-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-caption uppercase tracking-wider text-muted-foreground">
                Pending Review
              </h3>
              <Eye className="w-5 h-5 text-warning" strokeWidth={2} />
            </div>
            <p className="text-h2 text-foreground">{pendingCount}</p>
            <p className="text-body-sm text-warning mt-2">Requires attention</p>
          </div>

          <div className="glassmorphism neon-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-caption uppercase tracking-wider text-muted-foreground">
                Flagged Reports
              </h3>
              <AlertTriangle className="w-5 h-5 text-error" strokeWidth={2} />
            </div>
            <p className="text-h2 text-foreground">{flaggedCount}</p>
            <p className="text-body-sm text-error mt-2">Suspicious activity</p>
          </div>

          <div className="glassmorphism neon-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-caption uppercase tracking-wider text-muted-foreground">
                Verified Today
              </h3>
              <CheckCircle className="w-5 h-5 text-success" strokeWidth={2} />
            </div>
            <p className="text-h2 text-foreground">47</p>
            <p className="text-body-sm text-success mt-2">+12 from yesterday</p>
          </div>
        </div>

        <div className="glassmorphism neon-border rounded-lg p-6">
          <h2 className="text-h3 text-foreground mb-6">Reports Queue</h2>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className={`p-6 rounded-lg border transition-colors ${
                  report.flagged
                    ? "bg-error/10 border-error"
                    : report.status === "verified"
                    ? "bg-success/10 border-success"
                    : "bg-muted/30 border-border hover:border-primary"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-caption ${
                          report.type === "need"
                            ? "bg-error/20 text-error"
                            : "bg-success/20 text-success"
                        }`}
                      >
                        {report.type}
                      </span>
                      <span className="text-body text-foreground font-medium">
                        {report.category}
                      </span>
                      <span className="text-body-sm text-muted-foreground">
                        {report.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-body-sm text-muted-foreground">
                      <span>Urgency: {report.urgency}</span>
                      <span>
                        {new Date(report.timestamp).toLocaleString()}
                      </span>
                      {report.flagged && (
                        <span className="text-error flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" strokeWidth={2} />
                          {report.reason}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.status === "pending" && (
                      <>
                        <Button
                          onClick={() => handleVerify(report.id)}
                          size="sm"
                          className="bg-success text-success-foreground hover:opacity-90 border-0"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" strokeWidth={2} />
                          Verify
                        </Button>
                        <Button
                          onClick={() => handleReject(report.id)}
                          size="sm"
                          variant="outline"
                          className="bg-transparent text-error border-error hover:bg-error/10"
                        >
                          <XCircle className="w-4 h-4 mr-2" strokeWidth={2} />
                          Reject
                        </Button>
                      </>
                    )}
                    {report.status === "verified" && (
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle className="w-5 h-5" strokeWidth={2} />
                        <span className="text-body-sm">Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

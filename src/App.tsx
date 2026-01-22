import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobeCanvas } from "./components/GlobeCanvas";
import { CommandSearch } from "./components/CommandSearch";
import { InfoPanel } from "./components/InfoPanel";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { ReportFormOverlay } from "./components/ReportFormOverlay";
import { FeedPanel } from "./components/FeedPanel";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { AIIntelligence } from "./pages/AIIntelligence";
import { AdminPanel } from "./pages/AdminPanel";
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./hooks/use-toast";

export interface Node {
  id: string;
  type: "need" | "help";
  lat: number;
  lng: number;
  category: string;
  description: string;
  urgency: number;
  timestamp: string;
  trustLevel: number;
  location: string;
  status: "active" | "matched" | "resolved";
  reportedBy?: string;
  verifiedBy?: string[];
  matchedWith?: string;
}

export interface User {
  id: string;
  name: string;
  skills: string[];
  trustScore: number;
  verified: boolean;
  actionsCompleted: number;
  availability: boolean;
}

function MainView() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [isFeedOpen, setIsFeedOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: "user-1",
    name: "Anonymous User",
    skills: [],
    trustScore: 75,
    verified: false,
    actionsCompleted: 0,
    availability: true,
  });
  const [filter, setFilter] = useState<{
    type?: "need" | "help";
    category?: string;
    urgency?: number;
  }>({});
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with realistic sample nodes
    const sampleNodes: Node[] = [
      {
        id: "1",
        type: "need",
        lat: 40.7128,
        lng: -74.006,
        category: "Medical",
        description: "Emergency medical supplies needed - insulin and diabetes medication",
        urgency: 95,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        trustLevel: 85,
        location: "New York, NY, USA",
        status: "active",
        reportedBy: "user-42",
        verifiedBy: ["user-15", "user-23"],
      },
      {
        id: "2",
        type: "help",
        lat: 51.5074,
        lng: -0.1278,
        category: "Food",
        description: "Community kitchen offering free meals - 500 servings available daily",
        urgency: 60,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        trustLevel: 92,
        location: "London, UK",
        status: "active",
        reportedBy: "user-88",
        verifiedBy: ["user-12", "user-34", "user-56"],
      },
      {
        id: "3",
        type: "need",
        lat: 35.6762,
        lng: 139.6503,
        category: "Shelter",
        description: "Temporary shelter required for 15 families displaced by flooding",
        urgency: 88,
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        trustLevel: 78,
        location: "Tokyo, Japan",
        status: "active",
        reportedBy: "user-67",
        verifiedBy: ["user-45"],
      },
      {
        id: "4",
        type: "help",
        lat: -33.8688,
        lng: 151.2093,
        category: "Transport",
        description: "Transportation assistance available - 3 vehicles for emergency evacuations",
        urgency: 50,
        timestamp: new Date(Date.now() - 5400000).toISOString(),
        trustLevel: 88,
        location: "Sydney, Australia",
        status: "active",
        reportedBy: "user-91",
        verifiedBy: ["user-22", "user-33"],
      },
      {
        id: "5",
        type: "need",
        lat: 48.8566,
        lng: 2.3522,
        category: "Medical",
        description: "Medical volunteers needed urgently - respiratory care specialists",
        urgency: 92,
        timestamp: new Date(Date.now() - 900000).toISOString(),
        trustLevel: 90,
        location: "Paris, France",
        status: "active",
        reportedBy: "user-54",
        verifiedBy: ["user-11", "user-78"],
      },
      {
        id: "6",
        type: "help",
        lat: 37.7749,
        lng: -122.4194,
        category: "Technology",
        description: "Tech support and internet access available at community center",
        urgency: 40,
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        trustLevel: 85,
        location: "San Francisco, CA, USA",
        status: "active",
        reportedBy: "user-29",
        verifiedBy: ["user-44"],
      },
      {
        id: "7",
        type: "need",
        lat: -23.5505,
        lng: -46.6333,
        category: "Water",
        description: "Clean water urgently needed - water treatment system failed",
        urgency: 98,
        timestamp: new Date(Date.now() - 600000).toISOString(),
        trustLevel: 82,
        location: "São Paulo, Brazil",
        status: "active",
        reportedBy: "user-73",
        verifiedBy: ["user-19"],
      },
      {
        id: "8",
        type: "help",
        lat: 55.7558,
        lng: 37.6173,
        category: "Education",
        description: "Free tutoring and educational resources for children",
        urgency: 35,
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        trustLevel: 79,
        location: "Moscow, Russia",
        status: "active",
        reportedBy: "user-36",
        verifiedBy: ["user-27"],
      },
    ];
    setNodes(sampleNodes);

    // Simulate realtime updates with more realistic data
    const interval = setInterval(() => {
      const categories = ["Medical", "Food", "Shelter", "Transport", "Water", "Technology", "Education"];
      const locations = [
        { name: "Mumbai, India", lat: 19.076, lng: 72.8777 },
        { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357 },
        { name: "Mexico City, Mexico", lat: 19.4326, lng: -99.1332 },
        { name: "Lagos, Nigeria", lat: 6.5244, lng: 3.3792 },
        { name: "Jakarta, Indonesia", lat: -6.2088, lng: 106.8456 },
        { name: "Berlin, Germany", lat: 52.52, lng: 13.405 },
        { name: "Toronto, Canada", lat: 43.6532, lng: -79.3832 },
      ];
      
      const location = locations[Math.floor(Math.random() * locations.length)];
      const type = Math.random() > 0.6 ? "need" : "help";
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      const newNode: Node = {
        id: Date.now().toString(),
        type,
        lat: location.lat,
        lng: location.lng,
        category,
        description: type === "need" 
          ? `Urgent ${category.toLowerCase()} assistance required`
          : `${category} support available`,
        urgency: Math.floor(Math.random() * 50) + 50,
        timestamp: new Date().toISOString(),
        trustLevel: Math.floor(Math.random() * 30) + 70,
        location: location.name,
        status: "active",
        reportedBy: `user-${Math.floor(Math.random() * 100)}`,
        verifiedBy: [],
      };
      
      setNodes((prev) => [...prev, newNode]);
      
      toast({
        title: `New ${type === "need" ? "Need" : "Help"} Reported`,
        description: `${category} in ${location.name}`,
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [toast]);

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  const handleClosePanel = () => {
    setSelectedNode(null);
  };

  const handleReportSubmit = (data: any) => {
    const newNode: Node = {
      id: Date.now().toString(),
      type: data.type,
      lat: data.lat || (Math.random() - 0.5) * 180,
      lng: data.lng || (Math.random() - 0.5) * 360,
      category: data.category,
      description: data.description,
      urgency: data.urgency,
      timestamp: new Date().toISOString(),
      trustLevel: currentUser.trustScore,
      location: data.location || "Unknown",
      status: "active",
      reportedBy: currentUser.id,
      verifiedBy: [],
    };
    setNodes((prev) => [...prev, newNode]);
    setIsReportFormOpen(false);
    toast({
      title: "Report Submitted",
      description: "Your report has been added to the global network.",
    });
  };

  const handleHelp = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node && node.type === "need") {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId ? { ...n, status: "matched" as const, matchedWith: currentUser.id } : n
        )
      );
      setCurrentUser((prev) => ({
        ...prev,
        actionsCompleted: prev.actionsCompleted + 1,
        trustScore: Math.min(100, prev.trustScore + 2),
      }));
      toast({
        title: "Help Offered",
        description: "You've been matched with this need. Contact information shared.",
      });
    }
  };

  const handleVerify = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              verifiedBy: [...(n.verifiedBy || []), currentUser.id],
              trustLevel: Math.min(100, n.trustLevel + 5),
            }
          : n
      )
    );
    setCurrentUser((prev) => ({
      ...prev,
      trustScore: Math.min(100, prev.trustScore + 1),
    }));
    toast({
      title: "Verification Submitted",
      description: "Thank you for verifying this report.",
    });
  };

  const handleResolve = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, status: "resolved" as const } : n))
    );
    setSelectedNode(null);
    setCurrentUser((prev) => ({
      ...prev,
      actionsCompleted: prev.actionsCompleted + 1,
      trustScore: Math.min(100, prev.trustScore + 3),
    }));
    toast({
      title: "Marked as Resolved",
      description: "This issue has been marked as resolved.",
    });
  };

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // AI-powered search parsing
    if (lowerQuery.includes("medical") || lowerQuery.includes("health")) {
      setFilter({ category: "Medical" });
      toast({ title: "Filter Applied", description: "Showing medical needs" });
    } else if (lowerQuery.includes("food")) {
      setFilter({ category: "Food" });
      toast({ title: "Filter Applied", description: "Showing food-related activity" });
    } else if (lowerQuery.includes("shelter") || lowerQuery.includes("housing")) {
      setFilter({ category: "Shelter" });
      toast({ title: "Filter Applied", description: "Showing shelter needs" });
    } else if (lowerQuery.includes("urgent") || lowerQuery.includes("emergency")) {
      setFilter({ urgency: 80 });
      toast({ title: "Filter Applied", description: "Showing urgent needs only" });
    } else if (lowerQuery.includes("help") && !lowerQuery.includes("need")) {
      setFilter({ type: "help" });
      toast({ title: "Filter Applied", description: "Showing available help" });
    } else if (lowerQuery.includes("need")) {
      setFilter({ type: "need" });
      toast({ title: "Filter Applied", description: "Showing needs" });
    }
  };

  const handleAction = (action: string) => {
    if (action === "report") {
      setIsReportFormOpen(true);
    } else if (action === "filter") {
      setFilter({});
      toast({ title: "Filters Cleared", description: "Showing all activity" });
    }
  };

  const filteredNodes = nodes.filter((node) => {
    if (node.status === "resolved") return false;
    if (filter.type && node.type !== filter.type) return false;
    if (filter.category && node.category !== filter.category) return false;
    if (filter.urgency && node.urgency < filter.urgency) return false;
    return true;
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <GlobeCanvas nodes={filteredNodes} onNodeClick={handleNodeClick} />

      <Navigation currentUser={currentUser} />

      <CommandSearch onSearch={handleSearch} onAction={handleAction} />

      <InfoPanel
        node={selectedNode}
        isOpen={!!selectedNode}
        onClose={handleClosePanel}
        onHelp={handleHelp}
        onVerify={handleVerify}
        onResolve={handleResolve}
      />

      <FeedPanel
        nodes={nodes}
        isOpen={isFeedOpen}
        onToggle={() => setIsFeedOpen(!isFeedOpen)}
      />

      <FloatingActionButton onClick={() => setIsReportFormOpen(true)} />

      <ReportFormOverlay
        isOpen={isReportFormOpen}
        onClose={() => setIsReportFormOpen(false)}
        onSubmit={handleReportSubmit}
      />

      <div className="fixed bottom-6 left-6 flex items-center gap-4 text-body-sm text-foreground z-10">
        <div className="glassmorphism neon-border px-4 py-2 rounded-md">
          <span className="text-primary font-mono">CIVICOS</span>
          <span className="ml-2 text-muted-foreground">v1.0</span>
        </div>
      </div>

      <div className="fixed bottom-6 right-24 flex flex-col gap-2 text-body-sm text-foreground z-10">
        <div className="glassmorphism neon-border px-4 py-2 rounded-md flex items-center gap-3">
          <span className="text-success">{filteredNodes.length}</span>
          <span className="text-muted-foreground">Active Nodes</span>
        </div>
        <div className="glassmorphism neon-border px-4 py-2 rounded-md flex items-center gap-3">
          <span className="text-error">{filteredNodes.filter(n => n.type === "need").length}</span>
          <span className="text-muted-foreground">Needs</span>
        </div>
        <div className="glassmorphism neon-border px-4 py-2 rounded-md flex items-center gap-3">
          <span className="text-success">{filteredNodes.filter(n => n.type === "help").length}</span>
          <span className="text-muted-foreground">Help Available</span>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/intelligence" element={<AIIntelligence />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;

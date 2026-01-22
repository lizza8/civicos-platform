import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, BarChart3, User, Brain, Shield } from "lucide-react";
import { User as UserType } from "../App";

interface NavigationProps {
  currentUser: UserType;
}

export function Navigation({ currentUser }: NavigationProps) {
  const location = useLocation();

  const links = [
    { path: "/", icon: Globe, label: "Globe" },
    { path: "/dashboard", icon: BarChart3, label: "Dashboard" },
    { path: "/intelligence", icon: Brain, label: "AI Intel" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/admin", icon: Shield, label: "Admin" },
  ];

  return (
    <nav className="fixed top-6 right-6 z-50 glassmorphism neon-border rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 p-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-normal ${
                isActive
                  ? "bg-primary/20 text-primary shadow-glow"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={2} />
              <span className="text-body-sm hidden md:inline">{link.label}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="border-t border-border p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-body-sm font-medium">
          {currentUser.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0 hidden md:block">
          <p className="text-body-sm text-foreground truncate">{currentUser.name}</p>
          <p className="text-caption text-muted-foreground">Trust: {currentUser.trustScore}</p>
        </div>
      </div>
    </nav>
  );
}

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, MapPin, Clock, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { TrustMeter } from "./TrustMeter";
import { UrgencyBar } from "./UrgencyBar";
import { Node } from "../App";

interface InfoPanelProps {
  node: Node | null;
  isOpen: boolean;
  onClose: () => void;
  onHelp: (nodeId: string) => void;
  onVerify: (nodeId: string) => void;
  onResolve: (nodeId: string) => void;
}

export function InfoPanel({
  node,
  isOpen,
  onClose,
  onHelp,
  onVerify,
  onResolve,
}: InfoPanelProps) {
  if (!node) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 glassmorphism neon-border border-l-2 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      node.type === "need" ? "bg-error" : "bg-success"
                    } animate-pulse`}
                  />
                  <h2 className="text-h3 text-foreground">
                    {node.type === "need" ? "Need" : "Help Offered"}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="bg-transparent text-foreground hover:bg-muted hover:text-primary border-0"
                >
                  <X className="w-6 h-6" strokeWidth={2} />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle
                      className="w-5 h-5 text-primary"
                      strokeWidth={2}
                    />
                    <span className="text-caption uppercase tracking-wider text-muted-foreground">
                      Category
                    </span>
                  </div>
                  <p className="text-body text-foreground">{node.category}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-caption uppercase tracking-wider text-muted-foreground">
                      Description
                    </span>
                  </div>
                  <p className="text-body text-foreground">{node.description}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-caption uppercase tracking-wider text-muted-foreground">
                      Urgency Level
                    </span>
                  </div>
                  <UrgencyBar value={node.urgency} />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-primary" strokeWidth={2} />
                    <span className="text-caption uppercase tracking-wider text-muted-foreground">
                      Location
                    </span>
                  </div>
                  <p className="text-body text-foreground">{node.location}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-primary" strokeWidth={2} />
                    <span className="text-caption uppercase tracking-wider text-muted-foreground">
                      Timestamp
                    </span>
                  </div>
                  <p className="text-body text-foreground">
                    {new Date(node.timestamp).toLocaleString()}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-primary" strokeWidth={2} />
                    <span className="text-caption uppercase tracking-wider text-muted-foreground">
                      Trust Level
                    </span>
                  </div>
                  <TrustMeter value={node.trustLevel} />
                </div>

                <div className="pt-6 space-y-3">
                  {node.type === "need" && (
                    <Button
                      onClick={() => onHelp(node.id)}
                      className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 border-0 shadow-glow hover:shadow-glow-hover"
                    >
                      I Can Help
                    </Button>
                  )}
                  <Button
                    onClick={() => onVerify(node.id)}
                    variant="outline"
                    className="w-full bg-transparent text-primary border-primary hover:bg-primary/10 hover:text-primary"
                  >
                    Verify Report
                  </Button>
                  <Button
                    onClick={() => onResolve(node.id)}
                    variant="outline"
                    className="w-full bg-transparent text-success border-success hover:bg-success/10 hover:text-success"
                  >
                    Mark as Resolved
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

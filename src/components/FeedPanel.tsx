import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Node } from "../App";

interface FeedPanelProps {
  nodes: Node[];
  isOpen: boolean;
  onToggle: () => void;
}

export function FeedPanel({ nodes, isOpen, onToggle }: FeedPanelProps) {
  const recentNodes = nodes.slice(-10).reverse();

  return (
    <>
      <Button
        onClick={onToggle}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-hover border-0"
        size="icon"
      >
        {isOpen ? (
          <ChevronLeft className="w-6 h-6" strokeWidth={2} />
        ) : (
          <ChevronRight className="w-6 h-6" strokeWidth={2} />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 z-30 glassmorphism neon-border border-r-2 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-primary" strokeWidth={2} />
                <h2 className="text-h4 text-foreground">Live Activity Feed</h2>
              </div>

              <div className="space-y-3">
                {recentNodes.map((node) => (
                  <div
                    key={node.id}
                    className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary transition-colors duration-fast"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          node.type === "need" ? "bg-error" : "bg-success"
                        } animate-pulse`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-body-sm text-primary">
                            {node.type === "need" ? "Need" : "Help"}
                          </span>
                          <span className="text-caption text-muted-foreground">
                            {node.category}
                          </span>
                        </div>
                        <p className="text-body-sm text-foreground line-clamp-2">
                          {node.description}
                        </p>
                        <p className="text-caption text-muted-foreground mt-2">
                          {node.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

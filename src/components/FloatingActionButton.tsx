import React from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-hover hover:scale-110 transition-all duration-normal border-0"
      size="icon"
    >
      <Plus className="w-8 h-8" strokeWidth={2} />
    </Button>
  );
}

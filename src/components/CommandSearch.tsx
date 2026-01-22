import React, { useState, useEffect } from "react";
import { Command } from "cmdk";
import { Search, MapPin, FileText, Filter } from "lucide-react";

interface CommandSearchProps {
  onSearch: (query: string) => void;
  onAction: (action: string) => void;
}

export function CommandSearch({ onSearch, onAction }: CommandSearchProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const suggestions = [
    { id: "report", label: "Report new need or offer", icon: FileText },
    { id: "locate", label: "Jump to location", icon: MapPin },
    { id: "filter", label: "Apply filters", icon: Filter },
  ];

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <button
          onClick={() => setOpen(true)}
          className="w-full glassmorphism neon-border rounded-lg px-6 py-4 flex items-center gap-4 text-foreground hover:neon-glow-hover transition-all duration-normal animate-glow"
        >
          <Search className="w-6 h-6 text-primary" strokeWidth={2} />
          <span className="flex-1 text-left text-body text-muted-foreground">
            Search needs, offer help, or locate crises worldwide…
          </span>
          <kbd className="px-2 py-1 text-caption bg-muted rounded-sm border border-border text-foreground">
            ⌘K
          </kbd>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm">
          <div className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
            <Command
              className="glassmorphism neon-border rounded-lg overflow-hidden shadow-xl"
              value={value}
              onValueChange={setValue}
            >
              <div className="flex items-center border-b border-border px-4">
                <Search className="w-6 h-6 text-primary mr-4" strokeWidth={2} />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent border-0 py-4 text-body text-foreground placeholder:text-muted-foreground focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setOpen(false);
                    }
                  }}
                />
              </div>
              <Command.List className="max-h-96 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-body-sm text-muted-foreground">
                  No results found.
                </Command.Empty>
                <Command.Group
                  heading="Suggestions"
                  className="text-caption uppercase tracking-wider text-muted-foreground px-2 py-2"
                >
                  {suggestions.map((suggestion) => (
                    <Command.Item
                      key={suggestion.id}
                      value={suggestion.label}
                      onSelect={() => {
                        onAction(suggestion.id);
                        setOpen(false);
                      }}
                      className="flex items-center gap-4 px-4 py-3 rounded-md cursor-pointer text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-fast data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                    >
                      <suggestion.icon className="w-5 h-5" strokeWidth={2} />
                      <span className="text-body">{suggestion.label}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </div>
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </>
  );
}

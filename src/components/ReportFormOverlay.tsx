import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";

interface ReportFormOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function ReportFormOverlay({
  isOpen,
  onClose,
  onSubmit,
}: ReportFormOverlayProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    type: "need",
    description: "",
    category: "",
    urgency: 50,
    location: "",
  });

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setStep(0);
    setFormData({
      type: "need",
      description: "",
      category: "",
      urgency: 50,
      location: "",
    });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-h3 text-foreground">Select Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFormData({ ...formData, type: "need" })}
                className={`p-6 rounded-lg border-2 transition-all duration-normal text-foreground ${
                  formData.type === "need"
                    ? "border-error bg-error/10"
                    : "border-border bg-transparent hover:border-primary"
                }`}
              >
                <div className="text-h4">Need</div>
                <p className="text-body-sm text-muted-foreground mt-2">
                  Report a need or crisis
                </p>
              </button>
              <button
                onClick={() => setFormData({ ...formData, type: "help" })}
                className={`p-6 rounded-lg border-2 transition-all duration-normal text-foreground ${
                  formData.type === "help"
                    ? "border-success bg-success/10"
                    : "border-border bg-transparent hover:border-primary"
                }`}
              >
                <div className="text-h4">Help</div>
                <p className="text-body-sm text-muted-foreground mt-2">
                  Offer assistance
                </p>
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-h3 text-foreground">Description</h3>
            <Textarea
              placeholder="Describe the situation in detail..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="min-h-32 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-h3 text-foreground">Category</h3>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="bg-muted/50 border-input text-foreground focus:border-primary focus:ring-primary">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border text-foreground">
                <SelectItem value="medical" className="text-foreground hover:bg-primary/10 hover:text-primary">Medical</SelectItem>
                <SelectItem value="food" className="text-foreground hover:bg-primary/10 hover:text-primary">Food</SelectItem>
                <SelectItem value="shelter" className="text-foreground hover:bg-primary/10 hover:text-primary">Shelter</SelectItem>
                <SelectItem value="transport" className="text-foreground hover:bg-primary/10 hover:text-primary">Transport</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-h3 text-foreground">Urgency Level</h3>
            <div className="space-y-4">
              <Slider
                value={[formData.urgency]}
                onValueChange={(value) =>
                  setFormData({ ...formData, urgency: value[0] })
                }
                max={100}
                step={1}
                className="w-full"
              />
              <div className="text-center">
                <span className="text-h2 text-primary">{formData.urgency}</span>
                <span className="text-body text-muted-foreground ml-2">/ 100</span>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-h3 text-foreground">Location</h3>
            <Input
              placeholder="Enter location..."
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="bg-muted/50 border-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            />
            <div className="p-4 rounded-lg bg-info/10 border border-info text-foreground">
              <p className="text-body-sm">
                AI will suggest the most accurate location based on your input.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl glassmorphism neon-border rounded-lg overflow-hidden"
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-h3 text-foreground">
                {formData.type === "need" ? "Report Need" : "Offer Help"}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="bg-transparent text-foreground hover:bg-muted hover:text-primary border-0"
              >
                <X className="w-6 h-6" strokeWidth={2} />
              </Button>
            </div>

            <div className="p-2">
              <Progress value={progress} className="h-1" />
            </div>

            <div className="p-6 min-h-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="p-6 border-t border-border flex items-center justify-between">
              <Button
                onClick={handleBack}
                disabled={step === 0}
                variant="outline"
                className="bg-transparent text-foreground border-border hover:bg-muted hover:text-primary disabled:opacity-40"
              >
                <ChevronLeft className="w-5 h-5 mr-2" strokeWidth={2} />
                Back
              </Button>
              {step < totalSteps - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 border-0 shadow-glow"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" strokeWidth={2} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 border-0 shadow-glow"
                >
                  Submit Report
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

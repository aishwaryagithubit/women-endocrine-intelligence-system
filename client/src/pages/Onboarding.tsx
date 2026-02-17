import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Onboarding() {
  const { updateUser, user } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cycleLength: 28,
    periodLength: 5,
    lastPeriodDate: "",
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    updateUser({
      cycleLength: formData.cycleLength,
      periodLength: formData.periodLength,
      lastPeriodStart: formData.lastPeriodDate ? new Date(formData.lastPeriodDate) : new Date(),
      onboardingCompleted: true
    });
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                s <= step ? "bg-primary" : "bg-primary/20"
              }`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 rounded-3xl"
            >
              <h2 className="font-display text-3xl font-bold mb-4">How long is your cycle?</h2>
              <p className="text-muted-foreground mb-8">
                The average cycle is 28 days, measuring from the first day of one period to the first day of the next.
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-full w-12 h-12"
                  onClick={() => setFormData(prev => ({ ...prev, cycleLength: Math.max(21, prev.cycleLength - 1) }))}
                >
                  -
                </Button>
                <div className="text-4xl font-bold font-display w-24 text-center">
                  {formData.cycleLength}
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-full w-12 h-12"
                  onClick={() => setFormData(prev => ({ ...prev, cycleLength: Math.min(45, prev.cycleLength + 1) }))}
                >
                  +
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground font-medium">DAYS</p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 rounded-3xl"
            >
              <h2 className="font-display text-3xl font-bold mb-4">How long does your period last?</h2>
              <p className="text-muted-foreground mb-8">
                The bleeding usually lasts between 3 to 7 days.
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-full w-12 h-12"
                  onClick={() => setFormData(prev => ({ ...prev, periodLength: Math.max(2, prev.periodLength - 1) }))}
                >
                  -
                </Button>
                <div className="text-4xl font-bold font-display w-24 text-center">
                  {formData.periodLength}
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-full w-12 h-12"
                  onClick={() => setFormData(prev => ({ ...prev, periodLength: Math.min(10, prev.periodLength + 1) }))}
                >
                  +
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground font-medium">DAYS</p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 rounded-3xl"
            >
              <h2 className="font-display text-3xl font-bold mb-4">When did your last period start?</h2>
              <p className="text-muted-foreground mb-8">
                Select the first day of your last period.
              </p>
              
              <div className="mb-8">
                <Label htmlFor="date" className="block mb-2">Start Date</Label>
                <Input 
                  type="date" 
                  id="date"
                  value={formData.lastPeriodDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastPeriodDate: e.target.value }))}
                  className="w-full text-lg p-4 h-14 rounded-xl"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleNext}
            disabled={step === 3 && !formData.lastPeriodDate}
            className="rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/25"
          >
            {step === 3 ? "Complete Setup" : "Next"}
            {step === 3 ? <Check className="ml-2" /> : <ChevronRight className="ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

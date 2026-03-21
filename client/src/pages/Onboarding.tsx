import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Onboarding() {
  const { updateUser, user, isPending } = useAuth();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);
  const [formData, setFormData] = useState({
    cycleLength: 28,
    periodLength: 5,
    lastPeriodDate: "",
    periodRegularity: "",
    healthGoal: "",
    birthControl: "",
  });

  // Navigate to dashboard when onboarding is completed
  useEffect(() => {
    if (user?.onboardingCompleted && isCompleting) {
      setLocation("/dashboard");
    }
  }, [user?.onboardingCompleted, isCompleting, setLocation]);

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsCompleting(true);
    updateUser({
      cycleLength: formData.cycleLength,
      periodLength: formData.periodLength,
      lastPeriodStart: formData.lastPeriodDate ? new Date(formData.lastPeriodDate) : new Date(),
      periodRegularity: formData.periodRegularity,
      healthGoal: formData.healthGoal,
      birthControl: formData.birthControl,
      onboardingCompleted: true
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4, 5, 6].map((s) => (
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

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 rounded-3xl"
            >
              <h2 className="font-display text-3xl font-bold mb-4">Are your periods usually regular or irregular?</h2>
              <p className="text-muted-foreground mb-8">
                Regular periods come around the same time each month, while irregular periods vary significantly.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => setFormData(prev => ({ ...prev, periodRegularity: "regular" }))}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.periodRegularity === "regular" 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold">Regular</div>
                  <div className="text-sm text-muted-foreground mt-1">My periods come on schedule</div>
                </button>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, periodRegularity: "irregular" }))}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.periodRegularity === "irregular" 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold">Irregular</div>
                  <div className="text-sm text-muted-foreground mt-1">My periods vary in timing</div>
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 rounded-3xl"
            >
              <h2 className="font-display text-3xl font-bold mb-4">What's your main health goal?</h2>
              <p className="text-muted-foreground mb-8">
                This helps us provide personalized insights and recommendations.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => setFormData(prev => ({ ...prev, healthGoal: "conceive" }))}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.healthGoal === "conceive" 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold">Trying to conceive</div>
                  <div className="text-sm text-muted-foreground mt-1">Planning for pregnancy</div>
                </button>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, healthGoal: "avoid" }))}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.healthGoal === "avoid" 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold">Avoiding pregnancy</div>
                  <div className="text-sm text-muted-foreground mt-1">Using natural family planning</div>
                </button>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, healthGoal: "tracking" }))}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.healthGoal === "tracking" 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold">Just tracking my health</div>
                  <div className="text-sm text-muted-foreground mt-1">Understanding my body better</div>
                </button>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-8 rounded-3xl"
            >
              <h2 className="font-display text-3xl font-bold mb-4">Are you currently using any birth control?</h2>
              <p className="text-muted-foreground mb-8">
                This information helps us provide more accurate cycle predictions and health insights.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => setFormData(prev => ({ ...prev, birthControl: "no" }))}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.birthControl === "no" 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold">No</div>
                  <div className="text-sm text-muted-foreground mt-1">Not using any birth control</div>
                </button>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, birthControl: "hormonal" }))}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.birthControl === "hormonal" 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold">Hormonal birth control</div>
                  <div className="text-sm text-muted-foreground mt-1">Pill, patch, ring, or injection</div>
                </button>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, birthControl: "non-hormonal" }))}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.birthControl === "non-hormonal" 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold">Non-hormonal methods</div>
                  <div className="text-sm text-muted-foreground mt-1">IUD, condom, or other barrier methods</div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleNext}
            disabled={
              (step === 3 && !formData.lastPeriodDate) ||
              (step === 4 && !formData.periodRegularity) ||
              (step === 5 && !formData.healthGoal) ||
              (step === 6 && !formData.birthControl) ||
              isPending ||
              isCompleting
            }
            className="rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/25"
          >
            {isCompleting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Completing...
              </>
            ) : step === 6 ? (
              <>
                Complete Setup
                <Check className="ml-2" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

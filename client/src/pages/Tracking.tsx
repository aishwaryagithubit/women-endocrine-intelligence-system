import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEntries } from "@/hooks/use-entries";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ChevronRight, ChevronLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const phases = [
  { id: 'menstruation', range: 'Days 1–5', color: 'border-rose-400', bg: 'bg-rose-50' },
  { id: 'follicular', range: 'Days 1–13', color: 'border-emerald-400', bg: 'bg-emerald-50' },
  { id: 'ovulation', range: 'Around Day 14', color: 'border-amber-400', bg: 'bg-amber-50' },
  { id: 'luteal', range: 'Days 15–28', color: 'border-purple-400', bg: 'bg-purple-50' }
];

const symptomList = [
  "Cramps", "Headache", "Bloating", "Acne", "Breast Tenderness", 
  "Mood Swings", "Fatigue", "Backache", "Nausea", "Insomnia"
];

export default function Tracking() {
  const { t } = useI18n();
  const { createEntry, isCreating } = useEntries();
  const { toast } = useToast();
  const [phaseIndex, setPhaseIndex] = useState(0);
  
  const [formData, setFormData] = useState({
    painIntensity: 0,
    mood: "Happy",
    energy: 5,
    sleep: 8,
    stress: 0,
    symptoms: [] as string[],
    notes: ""
  });

  const currentPhase = phases[phaseIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEntry({
      ...formData,
      userId: 1, // Simulated
      cyclePhase: currentPhase.id,
      date: new Date().toISOString().split('T')[0],
      flow: phaseIndex === 0 ? "Medium" : "None",
      painType: "None"
    }, {
      onSuccess: () => {
        toast({
          title: "Entry Saved",
          description: "Your daily biological data has been updated."
        });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-display font-bold text-gradient">{t('tracking')}</h1>
        <p className="text-muted-foreground">{t('mood')}</p>
      </div>

      {/* Cycle Circle Visualizer */}
      <div className="flex flex-col items-center justify-center space-y-8 py-10">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          {/* Background Ring */}
          <div className="absolute inset-0 rounded-full border-8 border-muted/30" />
          
          {/* Active Phase Ring Segment */}
          <motion.div 
            className={cn(
              "absolute inset-0 rounded-full border-8 border-transparent border-t-current transition-colors duration-500",
              currentPhase.color.replace('border-', 'text-')
            )}
            animate={{ rotate: phaseIndex * 90 }}
            transition={{ type: "spring", stiffness: 100 }}
          />

          {/* Central Phase Information */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPhase.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={cn("text-center px-8 z-10 w-full h-full flex flex-col items-center justify-center rounded-full transition-colors duration-500", currentPhase.bg)}
            >
              <h2 className="text-2xl font-display font-bold text-primary">{t(currentPhase.id)}</h2>
              <p className="text-sm font-medium text-muted-foreground mb-4">{currentPhase.range}</p>
              <p className="text-xs leading-relaxed text-foreground/80 italic max-w-[200px]">
                {t(`${currentPhase.id}_desc`)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 z-20">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setPhaseIndex((p) => (p - 1 + phases.length) % phases.length)}
              className="rounded-full hover:bg-primary/10"
            >
              <ChevronLeft className="w-8 h-8 text-primary" />
            </Button>
          </div>
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 z-20">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setPhaseIndex((p) => (p + 1) % phases.length)}
              className="rounded-full hover:bg-primary/10"
            >
              <ChevronRight className="w-8 h-8 text-primary" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tracking Form */}
      <Card className="glass-card p-8 rounded-3xl overflow-visible border-white/40 shadow-2xl shadow-primary/5">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">{t('pain')}</Label>
                <span className="text-primary font-bold text-xl">{formData.painIntensity}</span>
              </div>
              <Slider 
                value={[formData.painIntensity]} 
                max={10} 
                step={1}
                onValueChange={([v]) => setFormData(prev => ({ ...prev, painIntensity: v }))}
                className="py-4"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">{t('energy')}</Label>
                <span className="text-primary font-bold text-xl">{formData.energy}</span>
              </div>
              <Slider 
                value={[formData.energy]} 
                max={10} 
                step={1}
                onValueChange={([v]) => setFormData(prev => ({ ...prev, energy: v }))}
                className="py-4"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">{t('stress')}</Label>
                <span className="text-primary font-bold text-xl">{formData.stress}</span>
              </div>
              <Slider 
                value={[formData.stress]} 
                max={10} 
                step={1}
                onValueChange={([v]) => setFormData(prev => ({ ...prev, stress: v }))}
                className="py-4"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <Label className="text-lg font-semibold block">{t('symptoms')}</Label>
              <div className="grid grid-cols-2 gap-3">
                {symptomList.map(s => (
                  <div key={s} className="flex items-center space-x-3 p-3 rounded-xl bg-white/40 hover:bg-white/60 transition-colors border border-white/20">
                    <Checkbox 
                      id={s} 
                      checked={formData.symptoms.includes(s)}
                      onCheckedChange={(checked) => {
                        setFormData(prev => ({
                          ...prev,
                          symptoms: checked 
                            ? [...prev.symptoms, s]
                            : prev.symptoms.filter(x => x !== s)
                        }));
                      }}
                    />
                    <label htmlFor={s} className="text-sm font-medium leading-none cursor-pointer">
                      {s}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              disabled={isCreating}
            >
              {isCreating ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Save className="mr-2 w-5 h-5" />
                  {t('save')}
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

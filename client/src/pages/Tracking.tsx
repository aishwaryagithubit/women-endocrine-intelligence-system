import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEntries } from "@/hooks/use-entries";
import { useI18n } from "@/hooks/use-i18n";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ChevronRight, ChevronLeft, Save, Sparkles, BrainCircuit, Activity, BookOpen, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const phases = [
  { id: 'menstruation', range: 'Days 1–5', color: 'text-rose-400', border: 'border-rose-400', bg: 'bg-rose-50' },
  { id: 'follicular', range: 'Days 1–13', color: 'text-emerald-400', border: 'border-emerald-400', bg: 'bg-emerald-50' },
  { id: 'ovulation', range: 'Around Day 14', color: 'text-amber-400', border: 'border-amber-400', bg: 'bg-amber-50' },
  { id: 'luteal', range: 'Days 15–28', color: 'text-purple-400', border: 'border-purple-400', bg: 'bg-purple-50' }
];

const symptomList = [
  "Cramps", "Headache", "Bloating", "Acne", "Breast Tenderness", 
  "Mood Swings", "Fatigue", "Backache", "Nausea", "Insomnia"
];

export default function Tracking() {
  const { t } = useI18n();
  const { user } = useAuth();
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

  // Calculate HSI Score (Simulated logic)
  const hsiScore = useMemo(() => {
    const base = 85;
    const deductions = (formData.painIntensity * 2) + (formData.stress * 1.5) + (10 - formData.energy);
    return Math.max(0, Math.min(100, Math.round(base - deductions)));
  }, [formData]);

  // Calculate Cycle Day (Simulated based on phase)
  const cycleDay = useMemo(() => {
    if (phaseIndex === 0) return 3;
    if (phaseIndex === 1) return 9;
    if (phaseIndex === 2) return 14;
    return 22;
  }, [phaseIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEntry({
      ...formData,
      userId: user?.id || 1,
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
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header Tabs Simulation */}
      <div className="flex items-center gap-4 mb-2">
        <div className="bg-white/60 backdrop-blur-sm p-1 rounded-2xl border border-white/40 flex gap-1">
          <Button variant="ghost" size="sm" className="rounded-xl bg-white shadow-sm px-4">
            <BrainCircuit className="w-4 h-4 mr-2 text-primary" />
            AI Analysis
          </Button>
          <Button variant="ghost" size="sm" className="rounded-xl px-4 text-muted-foreground">
            Cycles & Patterns
          </Button>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <Activity className="w-4 h-4" />
          Sticks & Patterns
        </div>
      </div>

      {/* Weekly Summary Card (Matching UI Image) */}
      <Card className="glass-card p-6 md:p-8 rounded-[2.5rem] border-white/60 shadow-2xl shadow-primary/5 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20" />
        
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-2xl font-display font-bold text-foreground/80">{t('weekly_summary')}</h2>
            
            <div className="grid grid-cols-2 gap-8">
              {/* Cycle Info */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center shrink-0">
                  <div className="w-6 h-6 rounded-full bg-pink-400" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t('cycle')}</p>
                  <p className="text-muted-foreground">{t('day_of_cycle').replace('{{day}}', cycleDay.toString())}</p>
                </div>
              </div>

              {/* Stability Info */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t('stability')}</p>
                  <p className="text-muted-foreground line-clamp-2">Hormonal Stability {t('stable').toLowerCase()}</p>
                </div>
              </div>

              {/* Symptoms Info */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t('symptoms')}</p>
                  <p className="text-muted-foreground">Low fatigue + cramping</p>
                </div>
              </div>

              {/* Learning Info */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="font-bold text-lg">{t('learning')}</p>
                  <p className="text-muted-foreground">{t('learning_progress_msg')}</p>
                </div>
              </div>
            </div>

            <Button className="rounded-full bg-primary/20 hover:bg-primary/30 text-primary font-bold px-8 h-12 border-none">
              {t('view_report')} →
            </Button>
          </div>

          {/* HSI Gauge (Matching UI Image) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Multi-color Gauge Background */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" 
                  stroke="url(#hsiGradient)" 
                  strokeWidth="8" 
                  strokeDasharray={`${hsiScore * 2.83} 283`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="hsiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#2dd4bf" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="text-center z-10">
                <p className="text-xs font-bold text-muted-foreground tracking-widest mb-1 uppercase">{t('hsi_score')}</p>
                <motion.p 
                  key={hsiScore}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-bold text-foreground/80"
                >
                  {hsiScore}
                </motion.p>
                <div className="mt-2 py-1 px-4 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold border border-emerald-100 inline-block">
                  {t('stable')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Analyzing Status Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white/40 backdrop-blur-sm p-4 rounded-[2rem] border border-white/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-bold text-primary">{t('ai_analyzing')}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('ai_analysis_desc')}</p>
          </div>
        </div>
        <div className="md:ml-auto w-full md:w-auto">
          <Button 
            onClick={handleSubmit}
            disabled={isCreating}
            className="w-full md:w-auto h-12 rounded-2xl bg-primary hover:shadow-lg hover:shadow-primary/30 transition-all font-bold px-8"
          >
            {isCreating ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
            {t('save')}
          </Button>
        </div>
      </div>

      {/* Main Tracking Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Phase Selector Visualizer */}
        <Card className="md:col-span-5 glass-card p-8 rounded-[2.5rem] flex flex-col items-center justify-center space-y-6">
          <div className="relative w-full aspect-square flex items-center justify-center">
             <div className="absolute inset-0 rounded-full border-4 border-muted/20" />
             <motion.div 
               className={cn(
                 "absolute inset-0 rounded-full border-4 border-transparent border-t-current",
                 currentPhase.color
               )}
               animate={{ rotate: phaseIndex * 90 }}
             />
             <AnimatePresence mode="wait">
               <motion.div 
                 key={currentPhase.id}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className={cn("text-center px-6 w-[80%] aspect-square flex flex-col items-center justify-center rounded-full transition-all duration-500", currentPhase.bg)}
               >
                 <h3 className="text-xl font-display font-bold text-primary">{t(currentPhase.id)}</h3>
                 <p className="text-xs font-medium text-muted-foreground mb-3">{currentPhase.range}</p>
                 <p className="text-[10px] leading-relaxed text-foreground/60 italic line-clamp-3">
                   {t(`${currentPhase.id}_desc`)}
                 </p>
               </motion.div>
             </AnimatePresence>

             <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2">
               <Button size="icon" variant="ghost" className="rounded-full h-10 w-10" onClick={() => setPhaseIndex((p) => (p - 1 + phases.length) % phases.length)}>
                 <ChevronLeft className="w-6 h-6 text-primary" />
               </Button>
             </div>
             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2">
               <Button size="icon" variant="ghost" className="rounded-full h-10 w-10" onClick={() => setPhaseIndex((p) => (p + 1) % phases.length)}>
                 <ChevronRight className="w-6 h-6 text-primary" />
               </Button>
             </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-primary">{t('day_of_cycle').replace('{{day}}', cycleDay.toString())}</p>
          </div>
        </Card>

        {/* Sliders and Symptoms */}
        <div className="md:col-span-7 space-y-8">
          <Card className="glass-card p-6 rounded-[2rem] space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center"><Label className="font-bold">{t('pain')}</Label><span className="text-primary font-bold">{formData.painIntensity}</span></div>
              <Slider value={[formData.painIntensity]} max={10} onValueChange={([v]) => setFormData(p => ({...p, painIntensity: v}))} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><Label className="font-bold">{t('energy')}</Label><span className="text-primary font-bold">{formData.energy}</span></div>
              <Slider value={[formData.energy]} max={10} onValueChange={([v]) => setFormData(p => ({...p, energy: v}))} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><Label className="font-bold">{t('stress')}</Label><span className="text-primary font-bold">{formData.stress}</span></div>
              <Slider value={[formData.stress]} max={10} onValueChange={([v]) => setFormData(p => ({...p, stress: v}))} />
            </div>
          </Card>

          <Card className="glass-card p-6 rounded-[2rem] space-y-4">
            <Label className="font-bold block">{t('symptoms')}</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {symptomList.slice(0, 6).map(s => (
                <div key={s} className="flex items-center space-x-2 p-2 rounded-xl bg-white/40 border border-white/20">
                  <Checkbox id={s} checked={formData.symptoms.includes(s)} onCheckedChange={(c) => setFormData(p => ({...p, symptoms: c ? [...p.symptoms, s] : p.symptoms.filter(x => x !== s)}))} />
                  <label htmlFor={s} className="text-[10px] font-medium leading-none cursor-pointer">{s}</label>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

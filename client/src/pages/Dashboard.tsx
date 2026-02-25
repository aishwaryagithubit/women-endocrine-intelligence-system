import { useAuth } from "@/hooks/use-auth";
import { useEntries } from "@/hooks/use-entries";
import { useI18n } from "@/hooks/use-i18n";
import { format, addDays, differenceInDays } from "date-fns";
import { motion } from "framer-motion";
import { Droplet, Moon, Sun, Battery, Calendar as CalendarIcon, ArrowRight, Brain, Activity, ShieldCheck, Zap } from "lucide-react";
import { Link } from "wouter";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const { entries } = useEntries();
  const { t } = useI18n();

  if (!user) return null;

  // Calculate cycle phase (Simplified logic)
  const lastPeriod = user.lastPeriodStart ? new Date(user.lastPeriodStart) : new Date();
  const today = new Date();
  const cycleDay = (differenceInDays(today, lastPeriod) % (user.cycleLength || 28)) + 1;
  
  let phase = "follicular";
  let phaseColor = "text-pink-500";
  let phaseBg = "bg-pink-100";
  
  if (cycleDay <= (user.periodLength || 5)) {
    phase = "menstruation";
    phaseColor = "text-red-500";
    phaseBg = "bg-red-100";
  } else if (cycleDay >= 12 && cycleDay <= 16) {
    phase = "ovulation";
    phaseColor = "text-teal-500";
    phaseBg = "bg-teal-100";
  } else if (cycleDay > 16) {
    phase = "luteal";
    phaseColor = "text-purple-500";
    phaseBg = "bg-purple-100";
  }

  const nextPeriodDate = addDays(lastPeriod, user.cycleLength || 28);
  const daysUntilPeriod = differenceInDays(nextPeriodDate, today);

  // Mock data for chart
  const chartData = [
    { name: 'Day 1', mood: 4, energy: 3 },
    { name: 'Day 5', mood: 6, energy: 5 },
    { name: 'Day 10', mood: 8, energy: 9 },
    { name: 'Day 14', mood: 9, energy: 8 },
    { name: 'Day 20', mood: 5, energy: 6 },
    { name: 'Day 25', mood: 3, energy: 4 },
    { name: 'Day 28', mood: 2, energy: 2 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-foreground">
            {t("welcome")}, {user.name}
          </h1>
          <p className="text-muted-foreground mt-1">{t('cycle_overview')}</p>
        </div>
        <Link href="/tracking">
          <button className="bg-foreground text-background px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            {t("log_symptoms")}
          </button>
        </Link>
      </div>

      {/* Hero Cycle Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group"
        >
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 transition-colors duration-500 ${phaseBg.replace('bg-', 'bg-')}`}></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold bg-white/50 backdrop-blur-md mb-2 ${phaseColor}`}>
                  {t(phase)} {t('phase')}
                </span>
                <h2 className="text-5xl font-display font-bold text-foreground mb-2">{t('day_of_cycle').replace('{{day}}', cycleDay.toString())}</h2>
                <p className="text-muted-foreground">{t('day_of_cycle').replace('{{day}}', cycleDay.toString()).replace(cycleDay.toString(), '')} of {user.cycleLength} {t('days')} {t('cycle')}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('next_period')}</p>
                <p className="text-2xl font-bold text-foreground">{daysUntilPeriod} {t('days')}</p>
                <p className="text-sm text-muted-foreground">{format(nextPeriodDate, "MMM d")}</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="w-full bg-secondary/50 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(cycleDay / (user.cycleLength || 28)) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-purple-500"
                ></motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('today_prediction')}</p>
              <p className="font-bold text-lg">{t('high_energy')}</p>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <Droplet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('hydration_goal')}</p>
              <p className="font-bold text-lg">4 / 8 {t('cups')}</p>
            </div>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t('sleep_quality')}</p>
              <p className="font-bold text-lg">7.5 {t('hours')}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trends Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8 rounded-3xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-2xl font-bold">{t('mood_energy_trends')}</h3>
          <select className="bg-transparent border-none text-muted-foreground font-medium focus:ring-0">
            <option>{t('last_30_days')}</option>
            <option>{t('last_3_months')}</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#991b1b" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#991b1b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="mood" stroke="#991b1b" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
              <Area type="monotone" dataKey="energy" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorEnergy)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Deep AI Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="glass-card p-8 rounded-3xl border-primary/20 border-2"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-primary animate-pulse" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">{t('ai_cycle_analysis')}</h3>
              <p className="text-sm text-muted-foreground">{t('ai_analysis_status')}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <ShieldCheck className="w-3 h-3" />
            ENCRYPTED & PRIVATE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-secondary/30 rounded-2xl border border-white/50">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase">{t('pattern_recognition')}</span>
            </div>
            <p className="text-lg font-bold">Stable Cycle</p>
            <div className="mt-2 h-1.5 w-full bg-white/50 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[85%]"></div>
            </div>
          </div>

          <div className="p-4 bg-secondary/30 rounded-2xl border border-white/50">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold text-muted-foreground uppercase">{t('hormonal_balance')}</span>
            </div>
            <p className="text-lg font-bold">Balanced</p>
            <div className="mt-2 h-1.5 w-full bg-white/50 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-[92%]"></div>
            </div>
          </div>

          <div className="p-4 bg-secondary/30 rounded-2xl border border-white/50">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-muted-foreground uppercase">{t('ovulation_accuracy')}</span>
            </div>
            <p className="text-lg font-bold">98.4% Confidence</p>
            <div className="mt-2 h-1.5 w-full bg-white/50 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[98%]"></div>
            </div>
          </div>

          <div className="p-4 bg-secondary/30 rounded-2xl border border-white/50">
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-4 h-4 text-teal-500" />
              <span className="text-xs font-bold text-muted-foreground uppercase">{t('predicted_events')}</span>
            </div>
            <p className="text-lg font-bold">3 Upcoming</p>
            <div className="flex gap-1 mt-2">
              <div className="w-full h-1.5 bg-teal-500 rounded-full"></div>
              <div className="w-full h-1.5 bg-teal-500 rounded-full"></div>
              <div className="w-full h-1.5 bg-teal-500/30 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground">{t('energy_peak')}</p>
              <p className="text-sm font-bold">In 2 days</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground">{t('high_fertility')}</p>
              <p className="text-sm font-bold">Starts Feb 28</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground">{t('mood_shift')}</p>
              <p className="text-sm font-bold">Expected Mar 5</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Learning Promo */}
      <Link href="/learning">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-primary to-purple-400 rounded-3xl p-8 text-white relative overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h3 className="font-display text-2xl font-bold mb-2">{t('understand_body_better')}</h3>
              <p className="text-white/90 max-w-lg">
                {t('learning_promo_desc')}
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        </motion.div>
      </Link>
    </div>
  );
}

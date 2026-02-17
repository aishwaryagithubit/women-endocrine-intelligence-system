import { useAuth } from "@/hooks/use-auth";
import { useEntries } from "@/hooks/use-entries";
import { useI18n } from "@/hooks/use-i18n";
import { format, addDays, differenceInDays } from "date-fns";
import { motion } from "framer-motion";
import { Droplet, Moon, Sun, Battery, Calendar as CalendarIcon, ArrowRight } from "lucide-react";
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
  
  let phase = "Follicular";
  let phaseColor = "text-pink-500";
  let phaseBg = "bg-pink-100";
  
  if (cycleDay <= (user.periodLength || 5)) {
    phase = "Menstrual";
    phaseColor = "text-red-500";
    phaseBg = "bg-red-100";
  } else if (cycleDay >= 12 && cycleDay <= 16) {
    phase = "Ovulation";
    phaseColor = "text-teal-500";
    phaseBg = "bg-teal-100";
  } else if (cycleDay > 16) {
    phase = "Luteal";
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
          <p className="text-muted-foreground mt-1">Here's your daily health overview.</p>
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
                  {phase} Phase
                </span>
                <h2 className="text-5xl font-display font-bold text-foreground mb-2">Day {cycleDay}</h2>
                <p className="text-muted-foreground">of {user.cycleLength} day cycle</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Next Period</p>
                <p className="text-2xl font-bold text-foreground">{daysUntilPeriod} days</p>
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
              <p className="text-sm text-muted-foreground">Today's Prediction</p>
              <p className="font-bold text-lg">High Energy</p>
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
              <p className="text-sm text-muted-foreground">Hydration Goal</p>
              <p className="font-bold text-lg">4 / 8 Cups</p>
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
              <p className="text-sm text-muted-foreground">Sleep Quality</p>
              <p className="font-bold text-lg">7.5 Hours</p>
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
          <h3 className="font-display text-2xl font-bold">Mood & Energy Trends</h3>
          <select className="bg-transparent border-none text-muted-foreground font-medium focus:ring-0">
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#db2777" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#db2777" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="mood" stroke="#db2777" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
              <Area type="monotone" dataKey="energy" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorEnergy)" />
            </AreaChart>
          </ResponsiveContainer>
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
              <h3 className="font-display text-2xl font-bold mb-2">Understand Your Body Better</h3>
              <p className="text-white/90 max-w-lg">
                Explore our library of medically-reviewed articles about cycle health, nutrition, and mental wellness.
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

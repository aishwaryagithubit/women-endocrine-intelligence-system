import { motion } from "framer-motion";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Download, ChevronRight, Heart, Activity, BookOpen, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function History() {
  const { t } = useI18n();

  const filters = [
    { id: 'all', label: 'all_time' },
    { id: 'week', label: 'this_week' },
    { id: 'month', label: 'this_month', active: true },
    { id: 'year', label: 'this_year' },
  ];

  const historyData = [
    {
      month: 'February 2024',
      days: [
        {
          date: '24 Saturday',
          dayNum: '24',
          monthShort: 'Feb',
          isToday: true,
          points: 100,
          label: 'module_completed',
          detail: 'Hormonal Basics',
          metrics: [
            { icon: Activity, label: 'hormonal_stability', value: 'balanced', color: 'text-green-600', bg: 'bg-green-50' },
            { icon: Heart, label: 'pms_risk', value: 'low', color: 'text-red-600', bg: 'bg-red-50' }
          ]
        },
        {
          date: '23 Friday',
          dayNum: '23',
          monthShort: 'Feb',
          label: 'daily_checkin',
          metrics: [
             { icon: Activity, label: 'hormonal_stability', value: 'medium', color: 'text-amber-600', bg: 'bg-amber-50' }
          ]
        },
        {
          date: '22 Thursday',
          dayNum: '22',
          monthShort: 'Feb',
          label: 'daily_checkin',
        }
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary flex items-center gap-2">
            {t('history')}
            <CalendarIcon className="w-6 h-6 opacity-20" />
          </h1>
          <p className="text-muted-foreground text-sm">{t('tracked_dates_reports')}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                f.active 
                  ? "bg-primary text-white shadow-md" 
                  : "bg-white/50 text-muted-foreground hover:bg-white"
              )}
            >
              {t(f.label)}
            </button>
          ))}
          <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary/20 bg-white/50">
            <Download className="w-3.5 h-3.5" />
            {t('export')}
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {historyData.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-display font-bold text-foreground/80 flex items-center gap-2">
                {section.month}
                <CheckCircle2 className="w-4 h-4 text-green-500/50" />
              </h2>
            </div>

            <div className="space-y-4">
              {section.days?.map((day, dIdx) => (
                <motion.div 
                  key={dIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: dIdx * 0.1 }}
                  className="glass-card rounded-3xl p-4 md:p-6 relative overflow-hidden group"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex md:flex-col items-center gap-2 min-w-[60px]">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{day.monthShort}</span>
                      <div className="w-12 h-12 bg-primary/5 rounded-2xl flex flex-col items-center justify-center border border-primary/10">
                        <span className="text-xl font-bold text-primary leading-none">{day.dayNum}</span>
                        <span className="text-[8px] font-bold text-primary/60 uppercase">TMG</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-foreground">
                            {day.date.split(' ')[1]} {day.date.split(' ')[2]}
                          </h3>
                          {day.isToday && (
                            <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Now</span>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1 group-hover:text-primary transition-colors">
                          {t('view_report')} <ChevronRight className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="bg-white/40 rounded-2xl p-4 border border-white/60 space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                            {day.label === 'module_completed' ? <BookOpen className="w-5 h-5 text-primary" /> : <CalendarIcon className="w-5 h-5 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-foreground">
                              {t(day.label)} <span className="font-normal text-muted-foreground ml-1">{day.detail}</span>
                            </p>
                            {day.points && <p className="text-xs font-bold text-primary mt-1">+{day.points} points</p>}
                          </div>
                          <Button className="rounded-xl h-8 text-xs font-bold bg-primary shadow-sm hover:bg-primary/90">
                            {t('view_report')}
                          </Button>
                        </div>

                        {day.metrics && (
                          <div className="flex flex-wrap gap-4 pt-2 border-t border-white/50">
                            {day.metrics.map((m: any, mIdx: number) => (
                              <div key={mIdx} className="flex items-center gap-2">
                                <m.icon className={cn("w-3.5 h-3.5", m.color || "text-primary")} />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t(m.label)}</span>
                                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", m.bg || "bg-secondary/50", m.color || "text-foreground")}>
                                  {t(m.value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

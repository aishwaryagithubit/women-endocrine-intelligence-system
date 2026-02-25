import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { Heart, Gift, Award, TrendingUp, CheckCircle2, Bell, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Rewards() {
  const { t } = useI18n();
  const points = 350;
  const target = 1000;
  const progress = (points / target) * 100;

  const activityLog = [
    { id: 1, type: 'checkin', label: 'daily_checkin', points: 50, date: 'Today' },
    { id: 2, type: 'learning', label: 'module_completed', detail: 'Hormonal Basics', points: 100, date: 'Yesterday' },
    { id: 3, type: 'activity', label: 'Daily activity', points: 50, date: '2 days ago' },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-display font-bold text-primary">{t('rewards')}</h1>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Bell className="w-6 h-6 text-muted-foreground" />
        </Button>
      </div>

      {/* Main Points Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-3xl relative overflow-hidden"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Heart className="w-8 h-8 text-primary fill-primary/20" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t('reward_points')}</h2>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-bold text-primary">{points}</span>
              <span className="text-muted-foreground">/ {target}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-secondary" />
          <p className="text-sm text-muted-foreground mt-4 italic">
            {t('earn_points_desc')}
          </p>
        </div>
      </motion.div>

      {/* How to Earn & Redeem */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card border-none rounded-3xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            {t('how_to_earn')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-2xl border border-primary/10">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium">{t('daily_activity_points')}</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-2xl border border-primary/10">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium">{t('module_complete_points')}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card border-none rounded-3xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            {t('redeem_points')}
          </h3>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-secondary/50 rounded-full mx-auto flex items-center justify-center">
              <Gift className="w-10 h-10 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{t('redeem_desc')}</p>
            <Button className="w-full rounded-2xl py-6 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 disabled:opacity-50 disabled:shadow-none transition-all" disabled={points < target}>
              {t('redeem_button')}
              <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">1</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Impact */}
      <Card className="glass-card border-none rounded-3xl p-6">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {t('your_impact')}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/5 rounded-xl mx-auto flex items-center justify-center mb-2">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">{t('kits_donated')}</p>
            <p className="text-lg font-bold">1</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/5 rounded-xl mx-auto flex items-center justify-center mb-2">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">{t('girls_supported')}</p>
            <p className="text-lg font-bold">1</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/5 rounded-xl mx-auto flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">{t('total_points_earned')}</p>
            <p className="text-lg font-bold">1350</p>
          </div>
        </div>
      </Card>

      {/* Activity Log */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2 px-2">
          {t('activity_log')}
          <span className="text-xs font-normal text-muted-foreground">(optional)</span>
        </h3>
        <div className="space-y-3">
          {activityLog.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 glass-card rounded-2xl border-none">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary/40" />
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {t(item.label)}
                    {item.detail && <span className="font-normal text-muted-foreground italic ml-1">"{item.detail}"</span>}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.date}</p>
                </div>
              </div>
              <span className="font-bold text-primary">+{item.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

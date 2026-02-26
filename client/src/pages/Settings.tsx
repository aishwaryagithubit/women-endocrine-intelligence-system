import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { User, Shield, Bell, Lock, Download, Trash2, ChevronRight, UserCircle } from "lucide-react";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const { t, language, setLanguage } = useI18n();

  if (!user) return null;

  const sections = [
    {
      id: "profile",
      title: t('profile_details'),
      icon: UserCircle,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{t('full_name')}</Label>
              <Input 
                value={user.name} 
                onChange={(e) => updateUser({ name: e.target.value })}
                className="rounded-xl bg-white/50 border-primary/10 focus:border-primary/30 transition-all" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{t('age')}</Label>
              <Input 
                type="number"
                value={user.age || ""} 
                onChange={(e) => updateUser({ age: parseInt(e.target.value) })}
                placeholder="e.g. 25"
                className="rounded-xl bg-white/50 border-primary/10 focus:border-primary/30 transition-all" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">{t('email_username')}</Label>
            <Input value={user.username} disabled className="rounded-xl bg-secondary/30 border-none cursor-not-allowed opacity-70" />
          </div>
        </div>
      )
    },
    {
      id: "cycle",
      title: t('cycle_config'),
      icon: Shield,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">{t('cycle_length_days')}</Label>
            <div className="flex items-center gap-3">
              <Input 
                type="number" 
                defaultValue={user.cycleLength || 28}
                onChange={(e) => updateUser({ cycleLength: parseInt(e.target.value) })}
                className="rounded-xl bg-white/50 border-primary/10" 
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">{t('days')}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">{t('period_length_days')}</Label>
            <div className="flex items-center gap-3">
              <Input 
                type="number" 
                defaultValue={user.periodLength || 5}
                onChange={(e) => updateUser({ periodLength: parseInt(e.target.value) })}
                className="rounded-xl bg-white/50 border-primary/10" 
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">{t('days')}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "preferences",
      title: t('preferences'),
      icon: Bell,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-semibold">{t('language')}</Label>
              <p className="text-xs text-muted-foreground">{t('lang_desc')}</p>
            </div>
            <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-xl border border-primary/5">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'en' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-white/50'}`}
              >
                ENGLISH
              </button>
              <button 
                onClick={() => setLanguage('ne')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'ne' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-white/50'}`}
              >
                नेपाली
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-primary/5 pt-6">
            <div className="space-y-0.5">
              <Label className="text-base font-semibold">{t('email_notifications')}</Label>
              <p className="text-xs text-muted-foreground">{t('notif_desc')}</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-primary" />
          </div>
        </div>
      )
    },
    {
      id: "privacy",
      title: t('data_privacy'),
      icon: Lock,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-semibold">{t('anonymous_usage')}</Label>
              <p className="text-xs text-muted-foreground">{t('anonymous_desc')}</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-primary" />
          </div>
          <div className="flex items-center justify-between border-t border-primary/5 pt-6">
            <div className="space-y-0.5">
              <Label className="text-base font-semibold">{t('data_encryption')}</Label>
              <p className="text-xs text-muted-foreground">{t('encryption_desc')}</p>
            </div>
            <div className="text-[10px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 tracking-tighter uppercase">End-to-End ACTIVE</div>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Button variant="outline" className="w-full justify-between rounded-xl border-primary/10 hover:bg-primary/5 group h-12 transition-all">
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4 text-primary" />
                {t('download_data')}
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="ghost" className="w-full justify-between rounded-xl text-destructive hover:bg-destructive/5 group h-12 transition-all">
              <span className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                {t('delete_account')}
              </span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="flex items-baseline gap-3 mb-10">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">{t('settings')}</h1>
        <div className="h-1 flex-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full opacity-50"></div>
      </div>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card rounded-[2rem] overflow-hidden border border-white/40 shadow-sm"
          >
            <div className="bg-gradient-to-r from-primary/5 to-transparent px-8 py-5 border-b border-primary/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/80 shadow-sm flex items-center justify-center">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">{section.title}</h2>
            </div>
            <div className="p-8">
              {section.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

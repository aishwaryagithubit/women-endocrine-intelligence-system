import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const { language, setLanguage } = useI18n();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Profile Section */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card p-6 rounded-2xl"
        >
          <h2 className="text-xl font-bold mb-6">Profile Details</h2>
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input value={user.name} disabled className="mt-2 bg-white/50" />
            </div>
            <div>
              <Label>Email / Username</Label>
              <Input value={user.username} disabled className="mt-2 bg-white/50" />
            </div>
          </div>
        </motion.div>

        {/* Cycle Settings */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="glass-card p-6 rounded-2xl"
        >
          <h2 className="text-xl font-bold mb-6">Cycle Configuration</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>Cycle Length (Days)</Label>
              <Input 
                type="number" 
                defaultValue={user.cycleLength || 28}
                onChange={(e) => updateUser({ cycleLength: parseInt(e.target.value) })}
                className="mt-2 bg-white/50" 
              />
            </div>
            <div>
              <Label>Period Length (Days)</Label>
              <Input 
                type="number" 
                defaultValue={user.periodLength || 5}
                onChange={(e) => updateUser({ periodLength: parseInt(e.target.value) })}
                className="mt-2 bg-white/50" 
              />
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="glass-card p-6 rounded-2xl"
        >
          <h2 className="text-xl font-bold mb-6">Preferences</h2>
          
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-0.5">
              <Label className="text-base">Language</Label>
              <p className="text-sm text-muted-foreground">Switch between English and Nepali</p>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${language === 'en' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage('ne')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${language === 'ne' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                नेपाली
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive weekly health summaries</p>
            </div>
            <Switch defaultChecked />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

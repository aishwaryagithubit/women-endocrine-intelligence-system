import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/hooks/use-i18n";
import { motion } from "framer-motion";
import { LayoutDashboard, Calendar, BookOpen, MessageCircle, Stethoscope, Settings, LogOut, Menu, X, Gift, History } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@assets/WhatsApp_Image_2026-02-19_at_4.07.30_PM_1771566306100.jpeg";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { logout, user } = useAuth();
  const { t, language, setLanguage } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "dashboard", icon: LayoutDashboard },
    { href: "/tracking", label: "tracking", icon: Calendar },
    { href: "/learning", label: "learning", icon: BookOpen },
    { href: "/chat", label: "chat", icon: MessageCircle },
    { href: "/rewards", label: "rewards", icon: Gift },
    { href: "/history", label: "history", icon: History },
    { href: "/doctors", label: "doctors", icon: Stethoscope },
    { href: "/settings", label: "settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm lg:hidden p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Endora" className="w-16 h-16 rounded-full object-contain border border-primary/20 shadow-sm" />
              <h2 className="text-2xl font-display font-bold text-primary">Endora</h2>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-lg font-medium p-4 rounded-xl hover:bg-primary/10 flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                <item.icon className="w-5 h-5 text-primary" />
                {t(item.label)}
              </Link>
            ))}
            <button onClick={() => logout()} className="text-lg font-medium p-4 rounded-xl hover:bg-destructive/10 text-destructive flex items-center gap-3 mt-4 text-left">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 glass-card border-r border-border/50 sticky top-0 h-screen p-6">
        <div className="flex flex-col items-center gap-3 mb-10 px-2">
          <img src={logoImg} alt="Endora" className="w-24 h-24 rounded-full object-contain border border-primary/20 shadow-sm" />
          <h1 className="text-2xl font-display font-bold text-foreground text-center">Endora</h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/30" 
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}>
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-current")} />
                <span className="font-medium">{t(item.label)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-border/50">
          <div className="flex items-center justify-between px-2 mb-4">
             <span className="text-sm font-medium text-muted-foreground">{t('language')}</span>
             <button 
               onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')}
               className="text-xs font-bold bg-secondary px-2 py-1 rounded-md text-secondary-foreground"
             >
               {language === 'en' ? 'NE' : 'EN'}
             </button>
          </div>
          <button 
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">{t('logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        <div className="lg:hidden p-4 flex justify-between items-center glass-card m-4 rounded-xl sticky top-4 z-40">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Endora" className="w-12 h-12 rounded-full object-contain border border-primary/20 shadow-sm" />
            <h1 className="text-xl font-display font-bold text-foreground">Endora</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4 lg:p-8 max-w-6xl mx-auto flex-1 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-border/50 bg-white/30 backdrop-blur-sm py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-primary">{t('footer_contact')}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{t('footer_address')}</p>
                  <p>{t('footer_phone')}</p>
                  <p>{t('footer_email')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-primary">{t('navigation')}</h3>
                <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <Link href="/dashboard" className="hover:text-primary transition-colors">{t('dashboard')}</Link>
                  <Link href="/learning" className="hover:text-primary transition-colors">{t('learning')}</Link>
                  <Link href="/doctors" className="hover:text-primary transition-colors">{t('doctors')}</Link>
                </nav>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-primary">{t('footer_social')}</h3>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary cursor-pointer transition-colors">FB</div>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary cursor-pointer transition-colors">IG</div>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary cursor-pointer transition-colors">TW</div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
              <p>{t('footer_rights')}</p>
              <div className="flex gap-6 font-medium">
                <a href="#" className="hover:text-primary transition-colors">{t('footer_privacy')}</a>
                <a href="#" className="hover:text-primary transition-colors">{t('footer_terms')}</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

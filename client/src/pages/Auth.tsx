import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Heart } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import logoImg from "@assets/WhatsApp_Image_2026-02-19_at_3.51.24_PM_1771495804296.jpeg";

const authSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, isPending } = useAuth();
  const { language } = useI18n();
  
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof authSchema>) => {
    if (isLogin) {
      login({ username: data.username, password: data.password });
    } else {
      signup({ 
        username: data.username, 
        password: data.password, 
        name: data.name || "User",
        language: "en" 
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Visual Side */}
      <div className="md:w-1/2 bg-secondary/30 relative overflow-hidden flex items-center justify-center p-8">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/10 z-0"></div>
        <div className="relative z-10 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl shadow-primary/20 overflow-hidden border-4 border-white"
          >
            <img src={logoImg} alt="Endora Logo" className="w-full h-full object-cover" />
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {language === 'en' ? 'Endora' : 'एन्डोरा'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {language === 'en' 
              ? 'Understand your body, empower your life. Cycle tracking, health insights, and community support designed for you.'
              : 'आफ्नो शरीरलाई बुझ्नुहोस्, आफ्नो जीवनलाई सशक्त बनाउनुहोस्। तपाईंको लागि डिजाइन गरिएको चक्र ट्र्याकिङ, स्वास्थ्य अन्तर्दृष्टि, र सामुदायिक समर्थन।'}
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <h2 className="font-display text-3xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Join Endora"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Enter your details to access your personal dashboard." 
                : "Start your journey to better health understanding today."}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!isLogin && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" className="rounded-xl h-12 bg-white/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="jane@example.com" className="rounded-xl h-12 bg-white/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" className="rounded-xl h-12 bg-white/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full h-12 rounded-xl text-lg font-medium bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary font-semibold hover:underline underline-offset-4"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

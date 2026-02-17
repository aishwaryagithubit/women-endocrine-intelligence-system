import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useEntries } from "@/hooks/use-entries";
import { useI18n } from "@/hooks/use-i18n";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEntrySchema } from "@shared/schema";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Save } from "lucide-react";

// Icons for mood
import { Smile, Frown, Meh, Angry, Zap } from "lucide-react";

export default function Tracking() {
  const { user } = useAuth();
  const { createEntry, isCreating } = useEntries();
  const { t } = useI18n();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const form = useForm<z.infer<typeof insertEntrySchema>>({
    resolver: zodResolver(insertEntrySchema),
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      userId: user?.id,
      mood: "Happy",
      energy: 5,
      painIntensity: 0,
      stress: 0,
      symptoms: [],
      notes: ""
    },
  });

  const onSubmit = (data: z.infer<typeof insertEntrySchema>) => {
    createEntry({
      ...data,
      userId: user!.id,
      date: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
    });
  };

  const moods = [
    { label: "Happy", icon: Smile, color: "text-yellow-500 bg-yellow-100" },
    { label: "Sad", icon: Frown, color: "text-blue-500 bg-blue-100" },
    { label: "Irritable", icon: Angry, color: "text-red-500 bg-red-100" },
    { label: "Neutral", icon: Meh, color: "text-gray-500 bg-gray-100" },
    { label: "Energetic", icon: Zap, color: "text-purple-500 bg-purple-100" },
  ];

  const symptomsList = [
    "Cramps", "Headache", "Bloating", "Acne", "Backache", "Fatigue", "Cravings", "Insomnia"
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">{t("tracking")}</h1>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal rounded-xl border-border bg-white",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Mood Section */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 font-display">{t("mood")}</h3>
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <div className="flex flex-wrap gap-4">
                  {moods.map((mood) => (
                    <button
                      key={mood.label}
                      type="button"
                      onClick={() => field.onChange(mood.label)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl transition-all w-24",
                        field.value === mood.label 
                          ? "ring-2 ring-primary bg-white shadow-md transform scale-105" 
                          : "hover:bg-white/50"
                      )}
                    >
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", mood.color)}>
                        <mood.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium">{mood.label}</span>
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Sliders Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl">
              <FormField
                control={form.control}
                name="energy"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between mb-4">
                      <FormLabel className="text-lg font-medium">Energy Level</FormLabel>
                      <span className="font-bold text-primary">{field.value}/10</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[field.value || 5]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                        className="py-4"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <FormField
                control={form.control}
                name="stress"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between mb-4">
                      <FormLabel className="text-lg font-medium">Stress Level</FormLabel>
                      <span className="font-bold text-destructive">{field.value}/10</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[field.value || 0]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                        className="py-4"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Symptoms Section */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 font-display">{t("symptoms")}</h3>
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <div className="flex flex-wrap gap-3">
                  {symptomsList.map((symptom) => {
                    const isSelected = field.value?.includes(symptom);
                    return (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => {
                          const current = field.value || [];
                          if (isSelected) {
                            field.onChange(current.filter(s => s !== symptom));
                          } else {
                            field.onChange([...current, symptom]);
                          }
                        }}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                          isSelected 
                            ? "bg-primary text-white border-primary shadow-md" 
                            : "bg-white/50 text-foreground border-transparent hover:bg-white"
                        )}
                      >
                        {symptom}
                      </button>
                    );
                  })}
                </div>
              )}
            />
          </div>

          {/* Notes Section */}
          <div className="glass-card p-6 rounded-2xl">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium mb-2 block">Daily Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How did your day go? Any specific observations?" 
                      className="bg-white/50 border-none resize-none h-32 text-base rounded-xl focus:ring-1 focus:ring-primary"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isCreating}
            className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/25"
          >
            {isCreating ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2" />}
            {t("save")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

import { motion } from "framer-motion";
import { PlayCircle, Clock, CheckCircle } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

const modules = [
  {
    id: "1",
    title: "Understanding Your Cycle",
    title_ne: "आफ्नो चक्र बुझ्दै",
    description: "Learn the biological phases of your menstrual cycle and what happens in your body.",
    description_ne: "तपाईंको महिनावारी चक्रको जैविक चरणहरू र तपाईंको शरीरमा के हुन्छ भन्ने बारे जान्नुहोस्।",
    duration: "5 min read",
    duration_ne: "५ मिनेट पढाइ",
    category: "Basics",
    category_ne: "आधारभूत",
    image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "2",
    title: "Nutrition for Hormone Health",
    title_ne: "हर्मोन स्वास्थ्यका लागि पोषण",
    description: "Foods that support hormonal balance throughout different phases.",
    description_ne: "विभिन्न चरणहरूमा हर्मोनल सन्तुलनलाई समर्थन गर्ने खानाहरू।",
    duration: "8 min read",
    duration_ne: "८ मिनेट पढाइ",
    category: "Nutrition",
    category_ne: "पोषण",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "3",
    title: "Managing PMS Symptoms",
    title_ne: "PMS लक्षणहरू व्यवस्थापन",
    description: "Natural ways to alleviate cramps, bloating, and mood swings.",
    description_ne: "क्र्याम्प, ब्लोटिंग, र मुड स्विंग्स कम गर्ने प्राकृतिक तरिकाहरू।",
    duration: "6 min read",
    duration_ne: "६ मिनेट पढाइ",
    category: "Wellness",
    category_ne: "कल्याण",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "4",
    title: "Sleep & Hormones",
    title_ne: "निद्रा र हर्मोन",
    description: "Why your sleep quality changes during your cycle and how to improve it.",
    description_ne: "तपाईंको चक्रको समयमा तपाईंको निद्राको गुणस्तर किन परिवर्तन हुन्छ र यसलाई कसरी सुधार गर्ने।",
    duration: "4 min read",
    duration_ne: "४ मिनेट पढाइ",
    category: "Sleep",
    category_ne: "निद्रा",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=60"
  }
];

export default function Learning() {
  const { t, language } = useI18n();
  const isNe = language === 'ne';

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">{t('learning')}</h1>
        <p className="text-muted-foreground">{t('learning_hub_desc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            <div className="h-48 relative overflow-hidden">
              <img 
                src={module.image} 
                alt={isNe ? module.title_ne : module.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-foreground">
                {isNe ? module.category_ne : module.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {isNe ? module.title_ne : module.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {isNe ? module.description_ne : module.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center text-xs font-medium text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {isNe ? module.duration_ne : module.duration}
                </div>
                <button className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  {t('read_now')} <PlayCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

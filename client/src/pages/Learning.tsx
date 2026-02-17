import { motion } from "framer-motion";
import { PlayCircle, Clock, CheckCircle } from "lucide-react";

const modules = [
  {
    id: "1",
    title: "Understanding Your Cycle",
    description: "Learn the biological phases of your menstrual cycle and what happens in your body.",
    duration: "5 min read",
    category: "Basics",
    image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "2",
    title: "Nutrition for Hormone Health",
    description: "Foods that support hormonal balance throughout different phases.",
    duration: "8 min read",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "3",
    title: "Managing PMS Symptoms",
    description: "Natural ways to alleviate cramps, bloating, and mood swings.",
    duration: "6 min read",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "4",
    title: "Sleep & Hormones",
    description: "Why your sleep quality changes during your cycle and how to improve it.",
    duration: "4 min read",
    category: "Sleep",
    image: "https://images.unsplash.com/photo-1511295742362-92c96b504802?w=800&auto=format&fit=crop&q=60"
  }
];

export default function Learning() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">Learning Hub</h1>
        <p className="text-muted-foreground">Medically reviewed articles to help you understand your body.</p>
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
            {/* Health/Wellness stock image with overlay */}
            <div className="h-48 relative overflow-hidden">
              <img 
                src={module.image} 
                alt={module.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-foreground">
                {module.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {module.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {module.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center text-xs font-medium text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {module.duration}
                </div>
                <button className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Now <PlayCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { MapPin, Star, Phone } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

// Mock Doctors Data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Sharma",
    specialty: "gynecologist",
    city: "kathmandu",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60",
    contact: "+977 9800000001",
    fee: 400
  },
  {
    id: 2,
    name: "Dr. Anita Ray",
    specialty: "endocrinologist",
    city: "pokhara",
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop&q=60",
    contact: "+977 9800000002",
    fee: 500
  },
  {
    id: 3,
    name: "Dr. Priya Singh",
    specialty: "fertility_specialist",
    city: "lalitpur",
    rating: 5.0,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=800&auto=format&fit=crop&q=60",
    contact: "+977 9800000003",
    fee: 700
  }
];

export default function Doctors() {
  const { t } = useI18n();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">{t('find_specialist')}</h1>
        <p className="text-muted-foreground">{t('trusted_pros')}</p>
      </div>

      <div className="grid gap-6">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4 rounded-2xl flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition-shadow"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h3 className="font-display text-xl font-bold">{doctor.name}</h3>
                <span className="bg-primary/10 text-primary px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide inline-block">
                  {t(doctor.specialty)}
                </span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {t(doctor.city)}
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{doctor.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviews} {t('reviews')})</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-primary flex items-center gap-1">
                {t('consultation_fee')}: {t('rs')} {doctor.fee}
              </div>
            </div>

            <button className="w-full md:w-auto px-6 py-3 bg-foreground text-background rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Phone className="w-4 h-4" />
              {t('book_appointment')}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

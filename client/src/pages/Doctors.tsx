import { motion } from "framer-motion";
import { MapPin, Star, Phone } from "lucide-react";

// Mock Doctors Data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Sharma",
    specialty: "Gynecologist",
    city: "Kathmandu",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60",
    contact: "+977 9800000001"
  },
  {
    id: 2,
    name: "Dr. Anita Ray",
    specialty: "Endocrinologist",
    city: "Pokhara",
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop&q=60",
    contact: "+977 9800000002"
  },
  {
    id: 3,
    name: "Dr. Priya Singh",
    specialty: "Fertility Specialist",
    city: "Lalitpur",
    rating: 5.0,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=800&auto=format&fit=crop&q=60",
    contact: "+977 9800000003"
  }
];

export default function Doctors() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">Find a Specialist</h1>
        <p className="text-muted-foreground">Trusted healthcare professionals in your area.</p>
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
            {/* Doctor Image from Unsplash */}
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h3 className="font-display text-xl font-bold">{doctor.name}</h3>
                <span className="bg-primary/10 text-primary px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide inline-block">
                  {doctor.specialty}
                </span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {doctor.city}
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold">{doctor.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <button className="w-full md:w-auto px-6 py-3 bg-foreground text-background rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Phone className="w-4 h-4" />
              Book Appointment
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

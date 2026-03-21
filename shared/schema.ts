
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Profile (stored in localStorage 'endora_user')
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(), // Email in this case
  password: text("password").notNull(), // Hashed
  name: text("name").notNull(),
  age: integer("age"),
  language: text("language").default("en"),
  // Onboarding Data
  cycleLength: integer("cycle_length"),
  periodLength: integer("period_length"),
  lastPeriodStart: timestamp("last_period_start"),
  periodRegularity: text("period_regularity"), // regular, irregular
  healthGoal: text("health_goal"), // conceive, avoid, tracking
  birthControl: text("birth_control"), // yes, no, method
  onboardingCompleted: boolean("onboarding_completed").default(false),
});

// Daily Tracking Entries (stored in localStorage 'endora_entries')
export const entries = pgTable("entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: text("date").notNull(), // YYYY-MM-DD
  cyclePhase: text("cycle_phase"), // Menstrual, Follicular, Ovulation, Luteal
  flow: text("flow"), // Light, Medium, Heavy, Spotting
  painType: text("pain_type"), // Cramps, Headache, Backache, etc.
  painIntensity: integer("pain_intensity"), // 1-10
  mood: text("mood"), // Happy, Irritable, Sad, Anxious, Energetic
  energy: integer("energy"), // 1-10
  sleep: integer("sleep"), // Hours
  stress: integer("stress"), // 1-10
  symptoms: text("symptoms").array(), // Multi-select
  notes: text("notes"),
});

// Learning Progress
export const learningProgress = pgTable("learning_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleId: text("module_id").notNull(),
  completed: boolean("completed").default(false),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users);
export const insertEntrySchema = createInsertSchema(entries);
export const insertLearningSchema = createInsertSchema(learningProgress);

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Entry = typeof entries.$inferSelect;
export type InsertEntry = z.infer<typeof insertEntrySchema>;
export type LearningProgress = typeof learningProgress.$inferSelect;

// Simulated AI Chat Message
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

// Doctor Type
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  city: string;
  contact: string;
  image?: string;
}

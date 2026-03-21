
import { User, InsertUser, Entry, InsertEntry, LearningProgress } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Entries
  getEntries(userId: number): Promise<Entry[]>;
  createEntry(userId: number, entry: InsertEntry): Promise<Entry>;

  // Learning
  getLearningProgress(userId: number): Promise<LearningProgress[]>;
  markModuleComplete(userId: number, moduleId: string): Promise<LearningProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private entries: Map<number, Entry>;
  private learning: Map<number, LearningProgress>;
  private currentId: number;
  private currentEntryId: number;
  private currentLearningId: number;

  constructor() {
    this.users = new Map();
    this.entries = new Map();
    this.learning = new Map();
    this.currentId = 1;
    this.currentEntryId = 1;
    this.currentLearningId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, language: "en", cycleLength: 28, periodLength: 5, lastPeriodStart: null, periodRegularity: null, healthGoal: null, birthControl: null, onboardingCompleted: false, age: insertUser.age ?? null };
    this.users.set(id, user);
    return user;
  }

  async getEntries(userId: number): Promise<Entry[]> {
    return Array.from(this.entries.values()).filter(
      (entry) => entry.userId === userId,
    );
  }

  async createEntry(userId: number, insertEntry: InsertEntry): Promise<Entry> {
    const id = this.currentEntryId++;
    const entry: Entry = {
      id,
      userId,
      date: insertEntry.date,
      cyclePhase: insertEntry.cyclePhase ?? null,
      flow: insertEntry.flow ?? null,
      painType: insertEntry.painType ?? null,
      painIntensity: insertEntry.painIntensity ?? null,
      mood: insertEntry.mood ?? null,
      energy: insertEntry.energy ?? null,
      sleep: insertEntry.sleep ?? null,
      stress: insertEntry.stress ?? null,
      symptoms: insertEntry.symptoms ?? null,
      notes: insertEntry.notes ?? null,
    };
    this.entries.set(id, entry);
    return entry;
  }

  async getLearningProgress(userId: number): Promise<LearningProgress[]> {
    return Array.from(this.learning.values()).filter(
      (l) => l.userId === userId,
    );
  }

  async markModuleComplete(userId: number, moduleId: string): Promise<LearningProgress> {
    // Check if exists
    const existing = Array.from(this.learning.values()).find(
      (l) => l.userId === userId && l.moduleId === moduleId
    );
    
    if (existing) {
      const updated = { ...existing, completed: true, timestamp: new Date() };
      this.learning.set(existing.id, updated);
      return updated;
    }

    const id = this.currentLearningId++;
    const newItem: LearningProgress = {
      id,
      userId,
      moduleId,
      completed: true,
      timestamp: new Date()
    };
    this.learning.set(id, newItem);
    return newItem;
  }
}

export const storage = new MemStorage();

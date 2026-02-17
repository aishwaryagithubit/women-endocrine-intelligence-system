import { type User, type InsertUser, type Entry, type InsertEntry, type LearningProgress } from "@shared/schema";

// Simulated Delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Keys
const USERS_KEY = "endora_users";
const ENTRIES_KEY = "endora_entries";
const LEARNING_KEY = "endora_learning";
const SESSION_KEY = "endora_session";

// Helpers
const getStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
  auth: {
    login: async (creds: { username: string; password?: string }) => {
      await delay(500);
      const users = getStorage<User>(USERS_KEY);
      const user = users.find(u => u.username === creds.username);
      if (!user) throw new Error("User not found");
      
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return user;
    },
    signup: async (userData: InsertUser) => {
      await delay(800);
      const users = getStorage<User>(USERS_KEY);
      if (users.find(u => u.username === userData.username)) {
        throw new Error("User already exists");
      }
      
      const newUser: User = { 
        ...userData, 
        id: Math.floor(Math.random() * 10000),
        cycleLength: 28,
        periodLength: 5,
        lastPeriodStart: null,
        onboardingCompleted: false,
        language: "en" 
      };
      
      users.push(newUser);
      setStorage(USERS_KEY, users);
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
      return newUser;
    },
    logout: async () => {
      localStorage.removeItem(SESSION_KEY);
    },
    me: async () => {
      await delay(200);
      const session = localStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) as User : null;
    },
    updateUser: async (updates: Partial<User>) => {
      await delay(500);
      const session = localStorage.getItem(SESSION_KEY);
      if (!session) throw new Error("Not authenticated");
      
      const currentUser = JSON.parse(session) as User;
      const users = getStorage<User>(USERS_KEY);
      
      const updatedUser = { ...currentUser, ...updates };
      const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
      
      setStorage(USERS_KEY, updatedUsers);
      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
      return updatedUser;
    }
  },
  entries: {
    list: async () => {
      await delay(500);
      const session = localStorage.getItem(SESSION_KEY);
      if (!session) return [];
      const user = JSON.parse(session) as User;
      const allEntries = getStorage<Entry>(ENTRIES_KEY);
      return allEntries.filter(e => e.userId === user.id);
    },
    create: async (entryData: InsertEntry) => {
      await delay(500);
      const session = localStorage.getItem(SESSION_KEY);
      if (!session) throw new Error("Not authenticated");
      const user = JSON.parse(session) as User;
      
      const entries = getStorage<Entry>(ENTRIES_KEY);
      const newEntry: Entry = {
        id: Math.floor(Math.random() * 10000),
        userId: user.id,
        date: entryData.date,
        cyclePhase: entryData.cyclePhase ?? null,
        flow: entryData.flow ?? null,
        painType: entryData.painType ?? null,
        painIntensity: entryData.painIntensity ?? null,
        mood: entryData.mood ?? null,
        energy: entryData.energy ?? null,
        sleep: entryData.sleep ?? null,
        stress: entryData.stress ?? null,
        symptoms: entryData.symptoms ?? null,
        notes: entryData.notes ?? null,
      };
      
      entries.push(newEntry);
      setStorage(ENTRIES_KEY, entries);
      return newEntry;
    }
  }
};

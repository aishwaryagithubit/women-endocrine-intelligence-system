
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertEntrySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Auth (Mock)
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      const existing = await storage.getUserByUsername(data.username);
      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = await storage.createUser(data);
      res.status(201).json({ user, token: "mock-token" });
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json({ user, token: "mock-token" });
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  // Entries
  app.get('/api/entries', async (req, res) => {
    // Mock user ID 1 for MVP if no auth middleware
    const entries = await storage.getEntries(1);
    res.json(entries);
  });

  app.post('/api/entries', async (req, res) => {
    try {
      const data = insertEntrySchema.parse(req.body);
      const entry = await storage.createEntry(1, data); // Mock user ID 1
      res.status(201).json(entry);
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  // Learning
  app.get('/api/learning', async (req, res) => {
    const progress = await storage.getLearningProgress(1); // Mock user ID 1
    res.json(progress);
  });

  app.post('/api/learning/complete', async (req, res) => {
    const { moduleId } = req.body;
    if (!moduleId) return res.status(400).json({ message: "Missing moduleId" });
    const result = await storage.markModuleComplete(1, moduleId);
    res.json(result);
  });

  return httpServer;
}

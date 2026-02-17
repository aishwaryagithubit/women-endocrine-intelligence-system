
import { z } from 'zod';
import { insertUserSchema, insertEntrySchema, insertLearningSchema } from './schema';

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/auth/login' as const,
      input: z.object({ username: z.string(), password: z.string() }),
      responses: {
        200: z.object({ user: insertUserSchema, token: z.string() }),
        401: z.object({ message: z.string() }),
      },
    },
    signup: {
      method: 'POST' as const,
      path: '/api/auth/signup' as const,
      input: insertUserSchema,
      responses: {
        201: z.object({ user: insertUserSchema, token: z.string() }),
        400: z.object({ message: z.string() }),
      },
    },
  },
  entries: {
    list: {
      method: 'GET' as const,
      path: '/api/entries' as const,
      responses: {
        200: z.array(insertEntrySchema),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/entries' as const,
      input: insertEntrySchema,
      responses: {
        201: insertEntrySchema,
      },
    },
  },
  learning: {
    list: {
      method: 'GET' as const,
      path: '/api/learning' as const,
      responses: {
        200: z.array(insertLearningSchema),
      },
    },
    markComplete: {
      method: 'POST' as const,
      path: '/api/learning/complete' as const,
      input: z.object({ moduleId: z.string() }),
      responses: {
        200: insertLearningSchema,
      },
    },
  },
};

export const errorSchemas = {
  validation: z.object({ message: z.string() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

import express from 'express';
import type { Request, Response } from 'express';
import { registerRoutes } from '../server/routes';

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize app with routes
let appPromise: Promise<express.Application>;

async function initializeApp() {
  try {
    await registerRoutes(app);
    
    // Error handler
    app.use((err: any, req: Request, res: Response, next: any) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
    });
    
    return app;
  } catch (error) {
    console.error('Failed to initialize app:', error);
    throw error;
  }
}

// Export handler for Vercel
export default async (req: Request, res: Response) => {
  try {
    if (!appPromise) {
      appPromise = initializeApp();
    }
    const app = await appPromise;
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
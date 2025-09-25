import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve TensorFlow.js model files
  app.use('/models', express.static(path.join(process.cwd(), 'client/public/models')));
  
  // API endpoint to get available models
  app.get('/api/models', (req, res) => {
    const availableModels = [
      {
        crop: 'tomato',
        labels: ['Tomato bacterial spot', 'Tomato leaf mold'],
        modelPath: '/models/tomato/'
      }
      // Add other models as they become available
    ];
    
    res.json(availableModels);
  });

  const httpServer = createServer(app);
  return httpServer;
}

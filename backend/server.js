import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & JSON Parsing
app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Mount API endpoints
app.use('/api', apiRoutes);

// Serve static frontend in production mode
const distPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(distPath));

// Fallback for SPA Routing
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('AgriShield X Backend API Service is running cleanly.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🌱 AgriShield X Backend Running on http://localhost:${PORT}`);
  console.log(`🤖 AI Provider: ${process.env.GEMINI_API_KEY ? 'Google Gemini AI (Live Key Configured)' : 'Deterministic AI Demo Mode (Graceful Fallback Active)'}`);
  console.log(`====================================================`);
});

export default app;

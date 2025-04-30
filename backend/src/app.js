import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

dotenv.config();

//  CORS settings to allow all URLS:
const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use the CORS middleware with the specified options

app.use(express.json());

//routes


app.get('/api', (req, res) => {
  res.send('API is running...');
});

export default app;
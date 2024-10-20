import express from 'express';
import mongoose from 'mongoose';
import weatherRoutes from './routes/waether'; 
import dotenv from 'dotenv';
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

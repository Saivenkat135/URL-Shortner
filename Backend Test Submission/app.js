import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.js';

import dotenv from 'dotenv';
dotenv.config();

// const urlRoutes = require('./routes/urlRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', urlRoutes);

// Serve the static files (HTML, CSS, JS)
app.use(express.static("public"));
// to display (serve) html ( to make sure that the server is running when HOSTED)
app.get(["/", "/api"], (req, res) => {
  try {
    res.sendFile(__dirname + "/public/index.html");
  } catch (e) {
    console.log("erorrrrr", e);
  }
});

//MongoDB Atlas Connection
try {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MongoDB URI not defined in .env file.");
    process.exit(1);
  }

  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to MongoDB Atlas CLOUD !!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB Atlas:", error);
    });
} catch (e) {
  console.log("cloud connecting error");
}

// mongoose.connect('mongodb://localhost:27017/urlshortener')
// .then(() => {
//   console.log('MongoDB connected');
// }).catch(err => console.error('DB Error:', err));

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/post', postRoutes)

app.get('/', (req, res) => {
  res.send("Welcome to the SphereNet Backend Server");
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
})
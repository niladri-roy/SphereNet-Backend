const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');


const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const tagRoutes = require('./routes/tagRoutes');
const commentRoute = require('./routes/commentRoute');

const userRoutes = require('./routes/User Routes/userRoute');
const userRoleRoutes = require('./routes/User Routes/userRoleRoute');

const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/v1/api/posts', postRoutes);

app.use('/v1/api/users', userRoutes);
app.use('/v1/api/users/role', userRoleRoutes);

app.use('/v1/api/tags', tagRoutes);

app.use('/v1/api/comments', commentRoute);


app.get('/', (req, res) => {
  res.send("Welcome to the SphereNet Backend Server");
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
})
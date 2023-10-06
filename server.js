const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

const authRoutes = require('./routes/authRoutes');

const postRoutes = require('./routes/postRoutes');
const blogRoutes = require('./routes/blogRoute');
const projectRoutes = require('./routes/projectRoute');
const newsletterRoutes = require('./routes/newsletterRoute');

const tagRoutes = require('./routes/tagRoutes');
const commentRoute = require('./routes/commentRoute');
const experienceRoute = require('./routes/experienceRoute');
const educationRoute = require('./routes/educationRoute');

const userRoutes = require('./routes/User Routes/userRoute');
const userRoleRoutes = require('./routes/User Routes/userRoleRoute');
const userEducationController = require('./routes/User Routes/userEducationRoute');
const userExperienceController = require('./routes/User Routes/userExperienceRoute');
const userConnectionController = require('./routes/User Routes/userConnectionRoute');
const userContentController = require('./routes/User Routes/userContentRoute');

const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.use('/v1/api/posts', postRoutes);
app.use('/v1/api/blogs', blogRoutes);
app.use('/v1/api/projects', projectRoutes);
app.use('/v1/api/newsletters', newsletterRoutes);

app.use('/v1/api/users', userRoutes);
app.use('/v1/api/users/role', userRoleRoutes);

app.use('/v1/api/tags', tagRoutes);

app.use('/v1/api/comments', commentRoute);

app.use('/v1/api/experiences', experienceRoute);
app.use('/v1/api/educations', educationRoute);

app.use('/v1/api/users/educations', userEducationController);
app.use('/v1/api/users/experiences', userExperienceController);
app.use('/v1/api/users/connections', userConnectionController);
app.use('/v1/api/users', userContentController);


app.get('/', (req, res) => {
  res.send("Welcome to the SphereNet Backend Server");
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
})
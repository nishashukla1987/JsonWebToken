const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api', authRoutes);

mongoose.connect(
  process.env.MONGO_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => {
    console.log('Database connected');
    app.listen(process.env.PORT, () => console.log('Server running'));
  }
);

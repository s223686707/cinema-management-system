const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://admin:Domain12@cluster0.h6nrkl7.mongodb.net/catalog?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use(cors());

const cinemaRoutes = require('./routes/cinema.routes');
const movieRoutes = require('./routes/movie.routes');

app.use('/api/cinemas', authMiddleware(), cinemaRoutes);
app.use('/api/movies', authMiddleware(), movieRoutes);

app.listen(PORT, () => {
  console.log(`Catalog service running on port ${PORT}`);
});

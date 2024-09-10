// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
var mongodb = require('mongodb');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reactAppGameData', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Game Schema
const gameSchema = new mongoose.Schema({
  title: String,
  score: Number,
  category: String
});

const Game = mongoose.model('Game', gameSchema);

app.get('/api/games', async (req, res) => {
    try {
      const games = await Game.find(); // Fetch all games from the database
      res.status(200).json(games);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// POST endpoint to add a new game
app.post('/api/games', async (req, res) => {
  const { title, score, category } = req.body;
  
  const newGame = new Game({ title, score, category });
  try {
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/games/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error('Invalid ObjectId:', id);
        return res.status(400).json({ error: 'Invalid game ID format' });
      }

      const deletedGame = await Game.findByIdAndDelete(id)
      if (!deletedGame) {
        return res.status(404).json({ message: 'Game not found' });
      }
      res.status(200).json({ message: 'Game deleted successfully', game: deletedGame });
    } catch (err) {
      console.error('Error deleting game:', err); 
      res.status(500).json({ error: err.message });
    }
});


//-----------------------------------------
//REGISTRATION

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  const { email, username, password } = req.body;
  
  const newUser = new User({ email, username, password });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

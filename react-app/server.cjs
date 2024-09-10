const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors"); // Import cors
const bodyParser = require("body-parser");

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.use(cors());

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json({ limit: '1000mb' })); // Increase the limit as needed
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/reactAppGameData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const gameSchema = new mongoose.Schema({
  gameName: String,
  gameCategory: String,
  gameRating: Number,
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

app.get('/api/games', async (req, res) => {
  try {
      const games = await Game.find();
      res.json(games);
  } catch (err) {
      console.error('Error fetching games from the database:', err);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/api/games", async (req, res) => {
  const { gameName, gameCategory, gameRating } = req.body;

  try {
    const newGame = new Game({
      gameName,
      gameCategory,
      gameRating,
    });

    await newGame.save();
    res.status(201).send(newGame);
  } catch (error) {
    res.status(500).send(error);
  }
});
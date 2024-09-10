import React from 'react'
import { ReactNode } from 'react';
import { Paper } from '@mui/material';
import CarouselVertical from './CarouselVertical';
import { useState } from 'react';
import axios from 'axios';

interface Props{
    children: ReactNode;
}

type Game = {
    _id: string;
    title: string;
    score: number;
    category: string;
}


const Layout = ({children}: Props) => {
const[games, setGames] = useState<Game[]>([]);
const [title, setTitle] = useState("");
const [score, setScore] = useState("");
const [category, setCategory] = useState("");

React.useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/games');
        setGames(response.data); // Initialize the state with games fetched from the server
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();
  }, []);



const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(title);
    console.log(score);
    console.log(category);

    const newGame: Game = {
        _id: (games.length + 1).toString(),
        title: title,
        score: Number(score),
        category: "Playing"
    };

    try {
        // Send data to backend server
        const response = await axios.post('http://localhost:5000/api/games', {
          title: newGame.title,
          score: newGame.score,
          category: newGame.category
        }
    );

    setGames([response.data, ...games]); // Add the newly created game from backend response
    setTitle("");
    setScore("");
    setCategory("");
  } catch (error) {
    console.error('Error adding game:', error);
  }
};

const handleSubmit2 = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(title);
    console.log(score);
    console.log(category);

    const newGame: Game = {
        _id: (games.length + 1).toString(),
        title: title,
        score: Number(score),
        category: "To Play"
    };

    try {
        // Send data to backend server
        const response = await axios.post('http://localhost:5000/api/games', {
          title: newGame.title,
          score: newGame.score,
          category: newGame.category
        }
    );

    setGames([response.data, ...games]); // Add the newly created game from backend response
    setTitle("");
    setScore("");
    setCategory("");
  } catch (error) {
    console.error('Error adding game:', error);
  }
};

const handleSubmit3 = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(title);
    console.log(score);
    console.log(category);

    const newGame: Game = {
        _id: (games.length + 1).toString(),
        title: title,
        score: Number(score),
        category: "Played"
    };

    try {
        // Send data to backend server
        const response = await axios.post('http://localhost:5000/api/games', {
          title: newGame.title,
          score: newGame.score,
          category: newGame.category
        }
    );

    setGames([response.data, ...games]); // Add the newly created game from backend response
    setTitle("");
    setScore("");
    setCategory("");
  } catch (error) {
    console.error('Error adding game:', error);
  }
};


const deleteGame = async (event: React.MouseEvent, gameId: string) => {
    event.stopPropagation();
    try {
      // Send DELETE request to backend server
      await axios.delete(`http://localhost:5000/api/games/${gameId}`);

      // Update state by filtering out the deleted game
      setGames(games.filter((game) => game._id !== gameId));
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const playingGames = games.filter(game => game.category === "Playing");
  const toPlayGames = games.filter(game => game.category === "To Play");
  const playedGames = games.filter(game => game.category === "Played");

  return (
    <div className="container text-center full-height">
        <div className="row align-items-start full-height">
            <div className="col column-border full-height">
                <Paper className='nes-container is-rounded is-dark press-start-2p-regular'>Playing</Paper>
                <div className='nes-container is-rounded is-dark'>
                    <form className = "game-form" onSubmit = {(event) => handleSubmit(event)}>
                        <input className = "nes-input is-dark" value = {title} onChange = {(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="Game Title"
                        required
                        ></input>
                        <input type="number" className="nes-input is-dark"
                            value = {score} onChange = {(event) =>
                                setScore(event.target.value)
                            }
                            placeholder = "Game Score"
                            required
                        ></input>
                        <button type = "submit" className="nes-btn is-primary">Add Game</button>
                    </form>
                </div>
                <div className="game-grid">
                    {playingGames.map((game) => (
                        <div key={game._id} className='nes-container is-rounded is-dark'>
                            <div className = "game-item">
                                <div className = "game-header"></div>
                                <h2>{game.title}</h2>
                                <p>{game.score}</p>
                                <button type="button" className="nes-btn is-error" onClick = {(event) => deleteGame(event, game._id)}>Delete Game</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col column-border full-height">
                <Paper className='nes-container is-rounded is-dark press-start-2p-regular'>To Play</Paper>
                <div className='nes-container is-rounded is-dark'>
                    <form className = "game-form" onSubmit = {(event) => handleSubmit2(event)}>
                        <input className = "nes-input is-dark" value = {title} onChange = {(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="Game Title"
                        required
                        ></input>
                        <input type="number" className="nes-input is-dark"
                            value = {score} onChange = {(event) =>
                                setScore(event.target.value)
                            }
                            placeholder = "Game Score"
                            required
                        ></input>
                        <button type = "submit" className="nes-btn is-primary">Add Game</button>
                    </form>
                </div>
                <div className="game-grid">
                    {toPlayGames.map((game) => (
                        <div key={game._id} className='nes-container is-rounded is-dark'>
                            <div className = "game-item">
                                <div className = "game-header"></div>
                                <h2>{game.title}</h2>
                                <p>{game.score}</p>
                                <button type="button" className="nes-btn is-error" onClick = {(event) => deleteGame(event, game._id)}>Delete Game</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col column-border full-height">
                <Paper className='nes-container is-rounded is-dark press-start-2p-regular'>Played</Paper>
                <div className='nes-container is-rounded is-dark'>
                <form className = "game-form" onSubmit = {(event) => handleSubmit3(event)}>
                        <input className = "nes-input is-dark" value = {title} onChange = {(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="Game Title"
                        required
                        ></input>
                        <input type="number" className="nes-input is-dark"
                            value = {score} onChange = {(event) =>
                                setScore(event.target.value)
                            }
                            placeholder = "Game Score"
                            required
                        ></input>
                        <button type = "submit" className="nes-btn is-primary">Add Game</button>
                    </form>
                </div>
                <div className="game-grid">
                    {playedGames.map((game) => (
                        <div key={game._id} className='nes-container is-rounded is-dark'>
                            <div className = "game-item">
                                <div className = "game-header"></div>
                                <h2>{game.title}</h2>
                                <p>{game.score}</p>
                                <button type="button" className="nes-btn is-error" onClick = {(event) => deleteGame(event, game._id)}>Delete Game</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout
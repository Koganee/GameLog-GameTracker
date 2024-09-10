import ListGroup from './components/ListGroup';
import Alert from './components/Alert';
import Button from './components/Button';
import Layout from './components/Layout';
import Login from './components/Login';


import './App.css';
import NavBar from './components/NavBar';
import { Avatar } from '@mui/material';
import UploadImage from './components/UploadImage';
import SetGameButton from './components/SetGameButton';

import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import AddGame from './components/AddGame';

interface Game {
  gameName: string;
  gameImage: string;
  gameCategory: string;
  gameRating: number;
}


function App()
{
  const [games, setGames] = useState<Game[]>([]);

  const handleAddGame = (game: Game) => {
    setGames([...games, game]);
  };
  
  
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
            <Route path="/new-page" element={<AddGame onAddGame={handleAddGame}/>} />
            <Route path="/home" element={<Layout>Columns</Layout>} />
            <Route path="/" element={<Login className = "loginPage"></Login>} />
        </Routes>
      </Router>
      
    </div>
  );
  
}


export default App;
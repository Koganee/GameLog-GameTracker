import React, { useState } from 'react'
import UploadImage from './UploadImage';
import { Paper } from '@mui/material';
import AddGameButton from './AddGameButton';

interface AddGameProps {
  onAddGame: (game: { gameName: string; gameImage: string; gameCategory: string; gameRating: number }) => void;
}


const AddGame: React.FC<AddGameProps> = ({ onAddGame }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [gameName, setGameName] = useState<string>('');
  const [gameCategory, setGameCategory] = useState<string>('');
  const [gameRating, setGameRating] = useState<number>(0);

  

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  }
  const handleAddGameClick = async () => {
    const gameData = {
      gameName,
      gameImage: imageUrl,
      gameCategory,
      gameRating,
    };
    try {
      const response = await fetch('http://localhost:27017/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });
  
      if (response.ok) {
        const savedGame = await response.json();
        onAddGame(savedGame);
      } else {
        console.error('Failed to add game:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  const boxStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto'
  };

  const selectStyle = {
    display: 'block',
    marginBottom: '10px'
  };

  const centreStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div style = {boxStyle} className='nes-container is-rounded is-dark'>
      <label>Select Category:</label>
      <div className="nes-select is-dark press-start-2p-regular">
        <select className="form-select" aria-label="Default select example" style ={selectStyle} onChange={(e) => setGameCategory(e.target.value)}>
          <option selected>Category</option>
          <option value="Playing">Playing</option>
          <option value="Played">Played</option>
          <option value="To_Play">To Play</option>
        </select>
        </div>
        <div></div>
        <div className="nes-field">
          <input id = "gameName" type="text" className="nes-input is-dark press-start-2p-regular" placeholder="Videogame Name" aria-label="Videogame Name" style ={selectStyle} onChange={(e) => setGameName(e.target.value)}></input>
        </div>
        <input type="number" className="nes-input is-dark press-start-2p-regular" placeholder="Rating/10" aria-label="Rating/10" style ={selectStyle} onChange={(e) => setGameRating(Number(e.target.value))}></input>
        <div className="nes-container is-rounded is-dark">
        <div style = {boxStyle}><label>Upload Image:</label>
        <div style = {centreStyle}><UploadImage onImageUpload={handleImageUpload}></UploadImage></div>
        <Paper elevation={12}><div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img src={imageUrl} alt={"Game Image"} className="image-fit" />
                </div>
        </div></Paper>
        </div>
        <div style={centreStyle}>
          
          <AddGameButton onClick={handleAddGameClick}/>
        </div>
        </div>
    </div>
  )
}

export default AddGame
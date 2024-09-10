import React, { useState, useEffect } from 'react'

interface GameData {
    gameName: string;
    gameImage: string;
    gameCategory: string;
    gameRating: number;
}

interface AddGameButtonProps {
    onClick: () => void;
}

const AddGameButton: React.FC<AddGameButtonProps> = ({ onClick }) =>{
    const [game, setGames] = useState<GameData[]>([]);


    return (
        <div>
      <button onClick={onClick} className="nes-input is-dark press-start-2p-regular">Add Game</button>
      <div>
        {game.map((g, index) => (
          <div key={index}>
            <img src={g.gameImage} alt={g.gameName} />
            <h3>{g.gameName}</h3>
            <p>{g.gameCategory}</p>
            <p>{g.gameRating}</p>
          </div>
        ))}
      </div>
    </div>
    )
}

export default AddGameButton
import React, { useState, useEffect }  from 'react'
import { Carousel } from 'primereact/carousel';
import { Paper } from '@mui/material';
import AddGameButton from './AddGameButton';
import AddGame from './AddGame';


interface Game {
    gameName: string;
    gameCategory: string;
    gameRating: number;
}
export default function CarouselVertical() {
    const [games, setGames] = useState<Game[]>([]);
    const [viewportHeight, setViewportHeight] = useState<string>('360px');
    const getGames = async () => {
        try {
            const response = await fetch('http://localhost:27017/api/games'); // Replace with your server URL
            const text = await response.text();
            const data = JSON.parse(text);
            setGames(data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };
    const handleAddGame = (game: { gameName: string; gameCategory: string; gameRating: number }) => {
        setGames([...games, game]);
    };

    const fetchGames = async () => {
        const gameData: Game[] = [ //Sets Data For Games.
          { gameName: 'Game 1',  gameCategory: 'Action', gameRating: 4.5 },
          { gameName: 'Game 2',  gameCategory: 'Adventure', gameRating: 4.0 },
          { gameName: 'Game 3',  gameCategory: 'Puzzle', gameRating: 3.5 },
          { gameName: 'Game 4',  gameCategory: 'Action', gameRating: 4.5 },
          { gameName: 'Game 5',  gameCategory: 'Adventure', gameRating: 4.0 },
          { gameName: 'Game 6',  gameCategory: 'Puzzle', gameRating: 3.5 },
        ];
        setGames(gameData);
    }; 
    
    useEffect(() => {
        getGames();
        fetchGames();
        const handleResize = () => {
            setViewportHeight(`${window.innerHeight-80}px`);
          };
      
          // Initialize the height on mount
          handleResize();
      
          // Update the height on window resize
          window.addEventListener('resize', handleResize);
      
          // Clean up the event listener on unmount
          return () => {
            window.removeEventListener('resize', handleResize);
          };
    }, []);

    const gameTemplate = (game: Game) => {
        return (
            <Paper elevation={12}><div className="nes-container is-rounded is-dark">
                <div className="mb-3">
                </div>
            </div></Paper>
        );
    };

    return (
        <div>
            <Carousel value={games} numVisible={3} numScroll={1} orientation="vertical" verticalViewPortHeight={viewportHeight} itemTemplate={gameTemplate} />
        </div>
    )
} 

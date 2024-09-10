import React, { useState } from 'react'
import UploadImage from './UploadImage';
import { Paper } from '@mui/material';
import AddGameButton from './AddGameButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props{
    className: string;
}

type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
}





const Login = ({ className }: Props) => {
    const[users, setUsers] = useState<User[]>([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const newUser: User = {
            _id: (users.length + 1).toString(),
            username: username,
            email: email,
            password: password
        };
    
        try {
            // Send data to backend server
            const response = await axios.post('http://localhost:5000/api/users', {
                username: newUser.username,
                email: newUser.email,
                password: newUser.password
            }
        );
    
        setUsers([response.data, ...users]); // Add the newly created game from backend response
        navigate('/home'); 
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
    <div className='loginPage'>
        <div style = {boxStyle} className='nes-container is-rounded is-dark press-start-2p-regular'>
            <form className = "game-form" onSubmit = {(event) => handleSubmit(event)}>
                <label>Email:</label>
                <div className="nes-field">
                    <input id = "gameName" type="text" className="nes-input is-dark press-start-2p-regular" aria-label="Email" style ={selectStyle} value = {email} onChange = {(event) =>
                        setEmail(event.target.value)}>
                    </input>
                </div>
                <label>Username:</label>
                <div className="nes-field">
                    <input id = "gameName" type="text" className="nes-input is-dark press-start-2p-regular" aria-label="Username" style ={selectStyle} value = {username} onChange = {(event) =>
                        setUsername(event.target.value)}></input>
                </div>
                <label>Password:</label>
                <div className="nes-field">
                    <input id = "gameName" type="text" className="nes-input is-dark press-start-2p-regular" aria-label="Password" style ={selectStyle} value = {password} onChange = {(event) =>
                        setPassword(event.target.value)}></input>
                </div>
                <div style={centreStyle}>
                    <button type = "submit" className="nes-btn is-primary">Register</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
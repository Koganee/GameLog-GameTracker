import { Avatar } from '@mui/material';
import React from 'react'
import { ReactNode } from 'react';
import UploadImage from './UploadImage';
import SetGameButton from './SetGameButton';
import { useNavigate } from 'react-router-dom';




const NavBar = () => {
    return (
    <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary custom-navbar" data-bs-theme="dark">
        <div className="container-fluid">
            <a className="navbar-brand press-start-2p-regular" href="/">GameLog</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nes-btn press-start-2p-regular" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nes-btn press-start-2p-regular" href="#">Forum</a>
                    </li>
                    
                </ul>
                <ul className="navbar-nav ms-auto d-flex align-items-center">
                    <li className="nav-item">
                        <Avatar className="navAvatar" />
                    </li>
                    <li className="nav-item">
                        <button type = "button" className="nes-btn is-primary press-start-2p-regular" onClick={event =>  window.location.href='/new-page'}>Add Game</button>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default NavBar
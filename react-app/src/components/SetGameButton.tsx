import React from 'react'
import { ReactNode } from 'react';


interface Props{
    className: string;
    children: ReactNode;
    onClick: () => void;
}

const SetGameButton = ({ className, children, onClick}: Props) => {
    

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}

export default SetGameButton
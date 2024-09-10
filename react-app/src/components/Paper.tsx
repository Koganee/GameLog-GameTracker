import React from 'react'

interface Props{
    elevation: number;
    className: string;
}

const Paper = ({elevation, className}: Props) => {
  return (
    <Paper elevation={24} className="paperClass"></Paper>
  )
}

export default Paper
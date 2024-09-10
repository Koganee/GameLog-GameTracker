import React from 'react'

interface Props{
    src: string;
    className: string;
}

const Avatar = ({ src, className }: Props) => {
  return (
    <div className='avatarStuff'>
      <Avatar src={src} className = 'AvatarPic'/>
    </div>
  )
}

export default Avatar
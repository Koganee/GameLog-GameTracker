import React, { useEffect, useState } from 'react';
import Avatar from './Avatar'; 

interface UploadImageProps {
  onImageUpload: (imageUrl: string) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
    
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default UploadImage
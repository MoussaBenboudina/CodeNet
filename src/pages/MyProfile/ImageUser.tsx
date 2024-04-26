import React, { useState, ChangeEvent } from "react";

interface ImageUserProps {
  image: string;
}

const ImageUser: React.FC<ImageUserProps> = ({ image }) => {
  return (
    <div>
      <img src={image} alt="Uploaded Image" />
    </div>
  );
};

export default ImageUser;

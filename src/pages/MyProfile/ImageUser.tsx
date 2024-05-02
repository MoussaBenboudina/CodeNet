import Image from "next/image";
import React, { useState, ChangeEvent } from "react";

interface ImageUserProps {
  image: string;
}

const ImageUser: React.FC<ImageUserProps> = ({ image }) => {
  return (
    <div>
      <img src={image} alt="Uploaded Image" width={100} height={100} />
    </div>
  );
};

export default ImageUser;

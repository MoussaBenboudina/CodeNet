import React, { useEffect, useState, ChangeEvent } from "react";
import {
  getStorage,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// Assuming your Firebase config and initialization is done correctly and exported
import { storage } from "@/firebase/firebase";

const ImageUser: React.FC = () => {
  const [img, setImg] = useState<File | null>(null); // Correct usage of File type for images
  const [imgUrl, setImgUrl] = useState<string[]>([]); // Array of strings for URLs

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setImg(files[0]);
    }
  };

  const handleUpload = async () => {
    if (img) {
      const imgRef = ref(storage, `files/${uuidv4()}`); // Use `storage` directly from import
      try {
        const snapshot = await uploadBytes(imgRef, img);
        const url = await getDownloadURL(snapshot.ref);
        setImgUrl((prevUrls) => [...prevUrls, url]);
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const filesRef = ref(storage, "files"); // Use `storage` directly from import
      try {
        const res = await listAll(filesRef);
        const urls = await Promise.all(
          res.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setImgUrl(urls);
      } catch (error) {
        console.error("Failed to list files", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="App">
      {/* <input type="file" onChange={handleFileChange} /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
      <br />
      {/* {imgUrl.map((url, index) => ( */}
      {/* <div key={index}> */}
      <img
        src={"Moussa.jpg"}
        height="250"
        width="250"
        alt="Uploaded"
        className=""
      />
      <br />
      {/* </div> */}
      {/* ))} */}
    </div>
  );
};

export default ImageUser;

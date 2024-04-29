import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import './App.css';

function App() {
  const [originalImage, setOriginalImage] = useState();
  const [compressedImage, setCompressedImage] = useState();
  const [originalSize, setOriginalSize] = useState();
  const [compressedSize, setCompressedSize] = useState();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setOriginalImage(URL.createObjectURL(file));
    setOriginalSize((file.size / 1024 / 1024).toFixed(2));

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    setCompressedImage(URL.createObjectURL(compressedFile));
    setCompressedSize((compressedFile.size / 1024 / 1024).toFixed(2));
  };

  return (
    <div className='App'>
      <h1>SMME Image Compression POC</h1>
      <input type='file' accept='image/*' onChange={handleImageUpload} />
      <div className='images'>
        {originalImage && (
          <div>
            <h3>Original Image (size: {originalSize} MB)</h3>
            <img src={originalImage} alt='original' />
          </div>
        )}
        {compressedImage && (
          <div>
            <h3>Compressed Image (size: {compressedSize} MB)</h3>
            <img src={compressedImage} alt='compressed' />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

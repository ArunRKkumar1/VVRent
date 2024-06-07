import React, { useRef, useState } from 'react'
import defaultImg from '../../images/upload.png'
import imageCompression from 'browser-image-compression';

//setImg is a function to set the image in the parent component

export default function ({ className, setIMG }) {

  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  //handleImageChange is a function to handle the image upload and resize it
  const handleImageChange = async(event) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }

    const rawFile = event.target.files[0];
    const compressedFile = imageCompression(rawFile, options);
    const file = await compressedFile.then(e=>e);
    
    setIMG(file);
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setImage(file);

          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  //handleClick is a function to trigger the file input
  const handleClick = (event) => {
    // console.log(hiddenFileInput);
    hiddenFileInput.current.click();
  };
  return (

    <div className=' flex flex-col items-center  gap-2'>

      <div onClick={handleClick} className='cursor-pointer'  >

        <img className={`${className}`} src={image ? URL.createObjectURL(image) : defaultImg} alt="upload image" />
        <input
          id="image-upload-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={hiddenFileInput}

          className='hidden'
        />
      </div>
      <button type='button' className='text-white text-center p-1 rounded-sm bg-blue-950 hover:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-400' onClick={handleClick} >{image ? 'Replace' : 'Upload'}</button>

    </div>

  )
}
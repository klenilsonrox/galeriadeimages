'use client'
import React, { useEffect, useRef, useState } from 'react';

const Page = () => {
  const [modalImage, setOpenModalImage] = useState(false);
  const imageRef = useRef();
  const [id, setId] = useState(1);
  const [image, setImage] = useState("");

  const images = [
    { image: "../images/1.jpg", id: 1 },
    { image: "../images/2.jpg", id: 2 },
    { image: "../images/3.jpg", id: 3 },
    { image: "../images/4.jpg", id: 4 },
    { image: "../images/5.jpg", id: 5 },
  ];

  useEffect(() => {
    setImage("../images/1.jpg");
  }, []);

  function verImage(e) {
    e.preventDefault();
    const imgId = Number(e.target.id);
    setOpenModalImage(true);
    setId(imgId);
    setImage(images.find(img => img.id === imgId).image);
  }

  function aumentarId() {
    const nextId = id < images.length ? id + 1 : 1;
    setId(nextId);
    setImage(images.find(img => img.id === nextId).image);
  }

  function diminuirId() {
    const prevId = id > 1 ? id - 1 : images.length;
    setId(prevId);
    setImage(images.find(img => img.id === prevId).image);
  }

  function closeModal(e) {
    if (e.target.id === "modal") {
      setOpenModalImage(false);
    }
  }

  return (
    <div className='p-4'>
      <div className='flex gap-4 max-w-7xl mx-auto w-full flex-wrap justify-center mt-4'>
        {images.map(img => (
          <img key={img.id} src={img.image} alt="" className='w-full max-w-[300px] cursor-pointer' onClick={verImage} id={img.id} />
        ))}
      </div>
      {modalImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" id='modal' onClick={closeModal}>
          <button className='absolute top-4 right-4 text-white text-2xl' onClick={() => setOpenModalImage(false)}>✖</button>
          <div className='flex items-center gap-3 w-full max-w-3xl px-4'>
            <p className='cursor-pointer text-2xl  font-bold bg-white text-black flex items-center justify-center rounded-full w-10 h-10 relative right-[-30px]' onClick={diminuirId}>←</p>
            <div className="flex justify-center w-full">
              <img src={image} alt="" className='w-full max-h-screen object-contain rounded-lg' ref={imageRef} />
            </div>
            <p className='cursor-pointer text-2xl  font-bold bg-white text-black flex items-center justify-center rounded-full w-10 h-10 relative right-[30px]' onClick={aumentarId}>→</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

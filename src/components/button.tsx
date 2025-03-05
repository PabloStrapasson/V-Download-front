"use client";

import Image from 'next/image';
import React, { useState } from 'react'

interface ButtonProps {
    onClick: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export default function Button({onClick}: ButtonProps) {

  //const [buttonText, setButtonText] = useState('Download');
  const [showImage, setShowImage] = useState(false);

  const handleClick = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    //setButtonText('Buscando');
    setShowImage(true);
    await onClick(event);
    setShowImage(false);
    //setButtonText('Download');
  };

  return (
    <div className='flex size-full justify-end mt-5'>
        <button 
            className='flex w-50 h-10 p-3 border-2 border-black rounded-sm items-center justify-center cursor-pointer hover:bg-gray-200 hover:text-black' 
            type='submit'
            onClick={handleClick}>
            {/* {buttonText} */}
            Download
            {showImage && (
              <Image src="/icons/loading/loading2.png" className='ml-1 animate-spin-slow' alt="Loading" width={15} height={15}/>
            )}
        </button>
    </div>
  )
}

"use client";

import Image from 'next/image';
import React, { useState } from 'react'

interface ButtonProps {
    onClick: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export default function Button({onClick}: ButtonProps) {

  const [buttonText, setButtonText] = useState('Baixar');
  const [showImage, setShowImage] = useState(false);

  const handleClick = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setButtonText('Baixando');
    setShowImage(true);
    await onClick(event);
    setShowImage(false);
    setButtonText('Baixar');
  };

  return (
    <div className='flex size-full mt-5 justify-center md:justify-end'>
        <button 
            className='flex w-30 md:w-50 h-10 p-3 items-center justify-center cursor-pointer rounded-sm bg-(--button-color) text-(--button-color-text) hover:bg-(--button-color-hover) hover:text-(--button-color-hover-text)' 
            type='submit'
            onClick={handleClick}>
            <p className='text-sm md:text-lg'>{buttonText}</p>
            {showImage && (
              <Image src="/loading.png" className='ml-1 animate-spin-slow' alt="Loading" width={15} height={15}/>
            )}
        </button>
    </div>
  )
}
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/button';
import InputLink from '@/components/inputLink';
import { getVideoID } from '@/utils/getVideoID';
import FormatModal from '@/components/formatModal';
import VideoFormatList from '@/components/videoFormatList';
import InvalidLink from '@/components/errorsComponents/invalidLink';

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [videoInfo, setVideoInfo] = useState({
    title: '',
    availableFormats: [],
    videoID: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvalidLink, setIsInvalidLink] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await getVideoInfo();
  }

  const getVideoInfo = async () => {
    try {
      setIsInvalidLink(false);
      const videoID = getVideoID(inputValue);
      console.log(`${process.env.API_BASE_URL}`)
      const response = await fetch(`${process.env.API_BASE_URL}${videoID}/info`);
      if(response.status === 404) {
        setIsInvalidLink(true);
        throw new Error('Vídeo not found');
      }
      const videoInfo = await response.json();
      
      videoInfo.videoID = videoID;
      
      setVideoInfo(videoInfo); 
      setIsModalOpen(true);
      } catch (error) {
        setIsInvalidLink(true)
        console.error('Error fetching video information:', error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section className='flex items-center size-full'>
          <div>
            <Image src="/logo.png" className='ml-1' alt="Logo" width={200} height={200}/>
          </div>
          <div className='size-full h-full ml-2'>
            <h1 className='text-5xl font-bold text-(--main-text-color)'>V-Download</h1>
            <p className='text-lg text-(--main-text-color)'>Baixe seus vídeos gratuitamente</p>
          </div>
        </section>
        <section>
          {isInvalidLink && (<InvalidLink onClose={() => setIsInvalidLink(false)}/>)}
          <form>
            <InputLink value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
            <Button onClick={handleSubmit}/>
          </form>
        </section>
        
        {Object.keys(videoInfo).length >= 1 && (
          <FormatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}> 
            <VideoFormatList videoInfo={videoInfo}/>
          </FormatModal>
        )}
      </main>
    </div>
  );
}

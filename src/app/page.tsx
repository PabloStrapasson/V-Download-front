"use client";

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/button';
import InputLink from '@/components/inputLink';
import { getVideoID } from '@/utils/getVideoID';
import FormatModal from '@/components/formatModal';
import VideoFormatList from '@/components/videoFormatList';
import InvalidLink from '@/components/invalidLink';

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [videoInfo, setVideoInfo] = useState({});
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
      const response = await fetch(`http://localhost:3500/download/${videoID}/info`);
      const videoInfo = await response.json();
      
      videoInfo.videoID = videoID;
      
      setVideoInfo(videoInfo); 
      setIsModalOpen(true);
      } catch (error) {
        setIsInvalidLink(true)
      console.error('Erro ao buscar informações do vídeo:', error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section className='flex items-center size-full'>
          <div>
            <Image src="/icons/icon1/download1.png" className='ml-1' alt="Logo" width={150} height={150}/>
          </div>
          <div className='size-full h-full ml-2'>
            <h1 className="text-4xl font-bold ">Video Downloader</h1>
            <p>Baixe seus vídeos do YouTube de gratuitamente</p>
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

"use client";

import { useState } from 'react';
import Button from '../components/button';
import InputLink from '../components/inputLink';
import { getVideoID } from '@/utils/getVideoID';
import FormatModal from '@/components/formatModal';
import VideoFormatList from '@/components/videoFormatList';

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [videoInfo, setVideoInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await getVideoInfo();
  }

  const getVideoInfo = async () => {
    try {
      const videoID = getVideoID(inputValue);
      const response = await fetch(`http://localhost:3500/download/${videoID}/info`);
      const videoInfo = await response.json();
      
      videoInfo.videoID = videoID;
      
      setVideoInfo(videoInfo); 
      setIsModalOpen(true);
      } catch (error) {
      console.error('Erro ao buscar informações do vídeo:', error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-amber-50">
        <h1 className="text-4xl font-bold ">Video Downloader</h1>
        <p>Baixe seus vídeos do YouTube de graça e com qualidade</p>
        <form >
          <InputLink value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
          <Button onClick={handleSubmit}/>
        </form>
        
        {Object.keys(videoInfo).length >= 1 && (
          <FormatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}> 
            <VideoFormatList videoInfo={videoInfo}/>
          </FormatModal>
        )}
      </main>
    </div>
  );
}

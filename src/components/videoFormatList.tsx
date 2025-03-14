import { useState } from "react";
import Button from "./button";
import InvalidFormat from "./errorsComponents/invalidFormat";

interface VideoFormatListProps {
    videoInfo: VideoInfo;
}

interface VideoInfo {
    title: string;
    availableFormats: Array<VideoFormat>;
    videoID: string;
}

interface VideoFormat {
  itag: number;
  mimeType: string;
  qualityLabel: string;
  container: string;
}

export default function VideoFormatList({videoInfo}: VideoFormatListProps) {
  const [selectedFormat, setSelectedFormat] = useState<number>()
  const [isInvalidFormat, setIsInvalidFormat] = useState<boolean>(false);

  const handleFormatChange = (itag: number) => {
    setSelectedFormat(itag);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFormat) {
      setIsInvalidFormat(true);
      return;
    }
    await downloadVideo();
  }

  const downloadVideo = async () => {
    const videoID = videoInfo.videoID;

    const data = {
      title: videoInfo.title,
      container: "mp4",
      itag: [selectedFormat,140]
    }
    try {
      const response = await fetch(`${process.env.API_BASE_URL}${videoID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.title}.${data.container}`; 
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  return (
    <div>
      <h1 className="mb-4 text-lg font-bold text-(--main-text-color)">{videoInfo.title}</h1>
      <form>
        <p className="mb-3 text-lg text-(--main-text-color)">Selecione uma das opções abaixo:</p>
        {videoInfo.availableFormats.map((format) => (
          <div key={format.itag}>
            <label className="flex h-2 items-center text-(--main-text-color)">
              <input
                type="radio"
                name="videoFormat"
                value={format.itag}
                onChange={() => handleFormatChange(format.itag)}
                className="mr-2 text-(--main-text-color)"
              />
              {format.qualityLabel} ({format.container})
            </label>
            <br/>
          </div>
        ))}
        {isInvalidFormat && (<InvalidFormat onClose={() => setIsInvalidFormat(false)}/>)}
        <Button onClick={handleSubmit}/>
      </form>
    </div>
  )
}

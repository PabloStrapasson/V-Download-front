import { useState } from "react";
import Button from "./button";

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

  const handleFormatChange = (itag: number) => {
    setSelectedFormat(itag);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await downloadVideo();
  }

  const downloadVideo = async () => {
    const videoID = videoInfo.videoID;
    console.log(videoID);

    const data = {
      title: videoInfo.title,
      container: "mp4",
      itag: [selectedFormat,140]
    }
  
    const response = await fetch(`http://localhost:3500/download/${videoID}`, {
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
  }
  
  return (
    <div>
      <h1 className="font-bold">{videoInfo.title}</h1>
      <br/>
      <form>
        {videoInfo.availableFormats.map((format) => (
          <div key={format.itag}>
            <label>
              <input
                type="radio"
                name="videoFormat"
                value={format.itag}
                onChange={() => handleFormatChange(format.itag)}
              />
              {format.qualityLabel} ({format.container})
            </label>
            <br/>
          </div>
        ))}
        <Button onClick={handleSubmit}/>
      </form>
    </div>
  )
}

export function getVideoID(url: string): string {
    const urlObj = new URL(url);
    const videoID = urlObj.searchParams.get("v");
    
    if (videoID === null) {
        throw new Error("Video ID not found in the URL");
    }
    
    return videoID;
}
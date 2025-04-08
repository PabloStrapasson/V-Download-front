export function getVideoID(url: string): string {
    
    const urlObj = new URL(url);
    const host = urlObj.host;
    const path = urlObj.pathname;

    if(host === 'www.youtube.com' || host === 'youtube.com') {

        if (path.includes('/shorts/')) {
            return getIDFromShortsUrl(path);
        }

        return getIDFromUrl(urlObj);

    } else if (host === 'youtu.be') {
        
        return getIDFromSharedLink(path);
    
    } else {
        throw new Error("Invalid YouTube URL");
    }
}

function getIDFromUrl(url: URL): string {
    const videoID = url.searchParams.get("v");
    if (videoID === null) {
        throw new Error();
    }
    return videoID;
}

function getIDFromShortsUrl(path: string): string {
    const parts = path.split('/');
    const videoID = parts[parts.length - 1];
    return videoID;
}

function getIDFromSharedLink(path: string): string {
    const videoID = path.replace('/', '');
    return videoID;
}
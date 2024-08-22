import { useState } from "react";
import ReactPlayer from "react-player";
import { Post, Video } from "../../../hooks/usePosts";

interface VideoContentProps {
  videos: Post["video"];
}

const VideoContent = ({ videos }: VideoContentProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePauseOtherAndPlay = (v: Video) => {
    const allVideos = document.querySelectorAll("video");
    const allAudios = document.querySelectorAll("audio");
    Array.from(allVideos).forEach((video) => {
      if (video.src !== v.location) {
        video.pause();
      }
    });
    Array.from(allAudios).forEach((a) => a.pause());
    setIsPlaying(true);
  };

  return (
    <>
      {(videos ?? []).map((v) => {
        return (
          <ReactPlayer
            playsinline={true}
            key={v.location}
            height="auto"
            width="100%"
            controls
            url={v.location}
            config={{
              file: {
                attributes: {
                  preload: "none",
                  poster: v.poster,
                },
              },
            }}
            playing={isPlaying}
            onStart={() => handlePauseOtherAndPlay(v)}
            onPause={() => {
              setIsPlaying(false);
            }}
            onPlay={() => handlePauseOtherAndPlay(v)}
          />
        );
      })}
    </>
  );
};

export default VideoContent;

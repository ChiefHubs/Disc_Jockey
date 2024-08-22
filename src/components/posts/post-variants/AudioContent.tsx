import { FunctionComponent } from "react";
import "react-h5-audio-player/lib/styles.css";
import React from "react";
import { Post, Audio } from "../../../hooks/usePosts";
import ReactPlayer from "react-player";
import { AspectRatio } from "@chakra-ui/react";
import Player from "../../common/AudioPlayer/Player";

interface AudioContentProps {
  audios: Post["audio"];
  hasaccess: boolean;
  accesslevel: number;
}

const embedAudio = function (a: Audio) {
  if (a.location.indexOf("<iframe") > -1) {
    return <div dangerouslySetInnerHTML={{ __html: a.location }}></div>;
  } else if (a.location.indexOf("spotify.com") > -1) {
    return (
      <>
        <AspectRatio height="152px">
          <iframe height="152px" src={a.location} allowFullScreen />
        </AspectRatio>
      </>
    );
  } else if (a.location.indexOf("https://") > -1) {
    return (
      <>
        <AspectRatio height="152px">
          <iframe height="152px" src={a.location} allowFullScreen />
        </AspectRatio>{" "}
      </>
    );
  } else {
    return (
      <>
        <ReactPlayer width="100%" height="185px" url={a.location} style={{ backgroundColor: "#fbeeff" }} />
      </>
    );
  }
};

const AudioContent: FunctionComponent<AudioContentProps> = ({ audios, hasaccess, accesslevel }) => {
  return (
    <>
      {(audios ?? []).map((a, index) => (
        <React.Fragment key={a.location + index}>
          {a.embedded ? embedAudio(a) : <Player audio={a} hasaccess={hasaccess} accesslevel={accesslevel} />}
        </React.Fragment>
      ))}
    </>
  );
};

export default AudioContent;

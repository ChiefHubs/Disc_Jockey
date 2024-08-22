import { Audio } from "../../../hooks/usePosts";
import { AudioPlayer } from "./AudioPlayer";

type Props = {
  audio: Audio;
  hasaccess: boolean;
  accesslevel: number;
};

const Player = ({ audio, hasaccess, accesslevel }: Props) => {
  const { location, title, artwork, author, meta_length } = audio;
  return (
    <AudioPlayer
      url={location}
      title={title}
      author={author}
      thumbnail={artwork}
      hasaccess={hasaccess}
      meta_length={meta_length}
      accesslevel={accesslevel}
    />
  );
};

export default Player;

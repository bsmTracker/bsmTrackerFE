import { PauseIcon } from "@/Components/Icon/PauseIcon";
import { PlayIcon } from "@/Components/Icon/PlayIcon";
import { Track } from "@/types/track";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { useUnSaveTrackMutation } from "@/query/track";

const TrackOptionCo = ({ track }: { track: Track }) => {
  const unSaveTrackMutation = useUnSaveTrackMutation(track.playlistId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<any>(null);

  useEffect(() => {
    if (playingAudio) {
      playingAudio.pause();
      setPlayingAudio(null);
    }
    if (isPlaying) {
      let playingAudio = new Audio(track.audio.path);
      playingAudio.play();
      playingAudio.onended = () => {
        setIsPlaying(false);
        setPlayingAudio(null);
      };
      setPlayingAudio(playingAudio);
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (playingAudio) {
        playingAudio.pause();
      }
    };
  }, [isPlaying, playingAudio]);

  const unsaveBtnHandler = async () => {
    unSaveTrackMutation.mutateAsync(track.code);
  };

  return (
    <TrackOptionCoUI>
      {isPlaying ? (
        <PauseIcon onClick={() => setIsPlaying(false)} />
      ) : (
        <PlayIcon onClick={() => setIsPlaying(true)} />
      )}
      <DeleteIcon onClick={unsaveBtnHandler} />
    </TrackOptionCoUI>
  );
};

const TrackOptionCoUI = tw.div`pr-[2px] flex flex-row gap-2 w-[60px]`;

export default TrackOptionCo;

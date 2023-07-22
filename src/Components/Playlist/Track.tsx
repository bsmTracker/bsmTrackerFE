import { Track } from "@/types/track";
import { useEffect, useState } from "react";
import { PauseIcon } from "../Icon/PauseIcon";
import { PlayIcon } from "../Icon/PlayIcon";
const TrackCo = ({
  track,
  showOption,
}: {
  track: Track;
  showOption: boolean;
}) => {
  const duration_s = Math.round(track.duration_ms / 1000);
  const hour = Math.floor(duration_s / 60 ** 2);
  const minute = Math.floor(duration_s / 60);
  const second = Math.floor(duration_s % 60);
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

  return (
    <div className="flex justify-between h-[110px] w-full items-center">
      <div className=" flex flex-row items-center gap-5">
        <img
          className="w-[180px] h-[110px] object-cover"
          src={track.image}
        ></img>
        <div>
          <p className="font-bold">{track.name}</p>
          <div className="flex flex-row gap-4">
            <p>
              {hour}시간 {minute}분 {second}초
            </p>
          </div>
        </div>
      </div>
      {showOption && (
        <div className="p-3">
          {isPlaying ? (
            <PauseIcon
              onClick={() => {
                setIsPlaying(false);
              }}
            />
          ) : (
            <PlayIcon
              onClick={() => {
                setIsPlaying(true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TrackCo;

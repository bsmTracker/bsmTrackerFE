import { useEffect, useState } from "react";
import { usePlayerVolumeMutation } from "@/query/player";
import { MenuButtonUI, MenuSubInfoUI } from "./UI";
import VolumeModal from "./Modal/volume";
import { playerSocket } from "@/socket/player";
import { BsVolumeUpFill } from "react-icons/bs";

const VolumeBtn = () => {
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(0);
  const playerVolumeMutation = usePlayerVolumeMutation();

  useEffect(() => {
    playerSocket.connect();
    playerSocket.on("volume", (volume) => {
      setVolume(volume);
    });
    return () => {
      playerSocket.disconnect();
    };
  }, [playerSocket]);

  return (
    <>
      <MenuButtonUI onClick={() => setOpen(!open)}>
        <BsVolumeUpFill size={20} />
        <p>음량</p>
        <MenuSubInfoUI>({volume}%)</MenuSubInfoUI>
        <VolumeModal
          open={open}
          close={() => setOpen(false)}
          volume={volume}
          setVolume={async (volume: number) => {
            await playerVolumeMutation.mutateAsync(volume);
          }}
        />
      </MenuButtonUI>
    </>
  );
};

export default VolumeBtn;

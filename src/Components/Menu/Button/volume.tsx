import { useEffect, useState } from "react";
import { usePlayerVolumeMutation } from "@/query/player";
import { MenuButtonGroupUI, MenuButtonUI, MenuSubInfoUI } from "./UI";
import { ListenIcon } from "@/Components/Icon/ListenIcon";
import VolumeModal from "./Modal/volume";
import { playerSocket } from "@/socket/player";

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
    <MenuButtonUI>
      <MenuButtonGroupUI onClick={() => setOpen(!open)}>
        <ListenIcon />
        <p>음량</p>
        <MenuSubInfoUI>({volume}%)</MenuSubInfoUI>
      </MenuButtonGroupUI>
      <VolumeModal
        open={open}
        close={() => setOpen(false)}
        volume={volume}
        setVolume={async (volume: number) => {
          await playerVolumeMutation.mutateAsync(volume);
        }}
      />
    </MenuButtonUI>
  );
};

export default VolumeBtn;

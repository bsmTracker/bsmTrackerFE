import tw from "tailwind-styled-components";

const VolumeModal = ({
  open,
  close,
  volume,
  setVolume,
}: {
  open: boolean;
  close: any;
  volume: any;
  setVolume: any;
}) => {
  return (
    <VolumeInfoWrapper open={open}>
      <VolumeInputUI
        onChange={async (e) => {
          const volume = Number(e.target.value);
          setVolume(volume);
        }}
        value={volume}
        type="range"
        min={0}
        max={100}
        step={5}
      />
      <VolumeInfoUI>{volume}%</VolumeInfoUI>
    </VolumeInfoWrapper>
  );
};

export default VolumeModal;

const VolumeInfoWrapper = tw.div`${({ open }: { open: boolean }) =>
  open
    ? "flex"
    : "hidden"} flex-col w-full gap-3 justify-center items-center max-w-[200px] absolute bg-gray-100 p-[30px] w-[180px] bottom-[-150px] right-0 rounded-lg`;
const VolumeInputUI = tw.input`h-[3px] flex w-full cursor-ew-resize appearance-none rounded-full bg-white accent-black transform h-[20px] cursor-pointer `;
const VolumeInfoUI = tw.p`mt-[5px]`;

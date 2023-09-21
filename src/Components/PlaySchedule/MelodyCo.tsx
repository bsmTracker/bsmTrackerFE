import { Audio } from "@/types/audio";
import { useRef } from "react";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { useAudioMutation, useRemoveAudioMutation } from "@/query/audio";
import tw from "tailwind-styled-components";

export const MelodyCo = ({
  setMelody,
  melody,
}: {
  setMelody: any;
  melody?: Audio | null;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const addAudiomutation = useAudioMutation();

  const uploadHandler = async () => {
    if (!inputRef.current?.files) return;
    const formData: any = new FormData();
    formData.append("audio", inputRef?.current?.files[0]);
    await addAudiomutation.mutateAsync(formData, {
      onSuccess: (data: Audio) => {
        setMelody(data);
      },
    });
  };

  const removeHandler = async () => {
    if (melody) {
      setMelody(null);
    }
  };

  return (
    <MelodyCoUI>
      1. 멜로디
      {!melody && (
        <BtnUI onClick={() => inputRef.current?.click()}>♪ Mp3 등록</BtnUI>
      )}
      {melody && (
        <MelodyUI>
          <span>{Math.round(melody.duration_ms / 1000)}초</span>
          <DeleteIcon onClick={removeHandler} />
        </MelodyUI>
      )}
      {!melody && (
        <HiddenInput
          type="file"
          accept="audio/mp3"
          ref={inputRef}
          onInput={async () => await uploadHandler()}
        />
      )}
    </MelodyCoUI>
  );
};

const MelodyCoUI = tw.div`flex flex-row gap-1 items-center`;
const BtnUI = tw.button`bg-gray-600 text-white px-[10px] w-[130px] h-[30px] rounded-lg`;
const MelodyUI = tw.div`flex flex-row items-center bg-[#F5F5F5] h-[30px] p-3 rounded-lg gap-2`;
const HiddenInput = tw.input`hidden`;

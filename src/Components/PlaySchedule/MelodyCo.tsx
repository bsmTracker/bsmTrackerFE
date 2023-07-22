import { Audio } from "@/types/audio";
import { useRef } from "react";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { addAudioMutation } from "@/query/audio";

export const MelodyCo = ({
  setMelody,
  melody,
}: {
  setMelody: any;
  melody?: Audio | null;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const addAudiomutation = addAudioMutation();

  const upload = async () => {
    if (!inputRef.current?.files) return;
    const formData: any = new FormData();
    formData.append("audio", inputRef?.current?.files[0]);
    await addAudiomutation.mutateAsync(formData, {
      onSuccess: (data: Audio) => {
        setMelody(data);
      },
    });
  };

  return (
    <div className="flex flex-row gap-1 items-center">
      멜로디 :
      {!melody && (
        <>
          <input
            style={{ visibility: "hidden", width: "0px" }}
            type="file"
            accept="audio/mp3"
            ref={inputRef}
            onInput={(e) => {
              upload();
            }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="bg-gray-600 text-white px-[10px] w-[130px] h-[30px] rounded-lg"
          >
            ♪ Mp3 등록
          </button>
        </>
      )}
      {melody && (
        <div className="flex flex-row items-center bg-[#F5F5F5] h-[30px] p-3 rounded-lg gap-2">
          <span>{Math.round(melody.duration_ms / 1000)}초</span>
          <DeleteIcon
            onClick={() => {
              setMelody(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

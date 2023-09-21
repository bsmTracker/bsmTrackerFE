import { useEffect, useState } from "react";
import { Tts } from "@/types/tts";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { useAddTtsMutation } from "@/query/tts";
import tw from "tailwind-styled-components";
import { PlayIcon } from "../Icon/PlayIcon";
import { PauseIcon } from "../Icon/PauseIcon";

export const TTSCo = ({ setTTS, tts }: { setTTS: any; tts?: Tts | null }) => {
  const addTtsMutation = useAddTtsMutation();
  const [content, setContent] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<any>(null);

  useEffect(() => {
    setContent(tts?.content ?? "");
  }, [tts]);

  const registerHandler = async () => {
    if (!content) {
      return;
    }
    await addTtsMutation.mutateAsync(
      {
        tts: content,
      },
      {
        onSuccess: (data: Tts) => {
          setTTS(data);
        },
      }
    );
  };

  const removeBtnHandler = async () => {
    if (tts) {
      setContent("");
      setTTS(null);
    }
  };

  useEffect(() => {
    if (playingAudio) {
      playingAudio.pause();
      setPlayingAudio(null);
    }
    if (isPlaying) {
      let playingAudio = new Audio(
        `${process.env.NEXT_PUBLIC_SERVER_URL}${tts?.audio.path}`
      );
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
    <TtsCoUI>
      2. tts
      {!tts && (
        <RowUI>
          <InputUI
            placeholder="이곳에 내용을 입력"
            value={content}
            onChange={(e: any) => setContent(e.target.value)}
          />
          <ButtonUI onClick={registerHandler}>등록</ButtonUI>
        </RowUI>
      )}
      {tts && (
        <TtsUI>
          <TtsContentUI>{tts.content}</TtsContentUI>{" "}
          <TtsTimeInfoUI>{Math.round(tts.duration_ms / 1000)}초</TtsTimeInfoUI>{" "}
          <RowUI>
            {isPlaying ? (
              <PauseIcon onClick={() => setIsPlaying(false)} />
            ) : (
              <PlayIcon onClick={() => setIsPlaying(true)} />
            )}
            <DeleteIcon onClick={removeBtnHandler} />
          </RowUI>
        </TtsUI>
      )}
    </TtsCoUI>
  );
};

const TtsCoUI = tw.div`flex flex-row gap-2 items-center`;
const RowUI = tw.div`flex flex-row`;
const InputUI = tw.input`w-[300px] h-[40px] p-2 bg-[#F5F5F5]`;
const ButtonUI = tw.button`bg-black text-white w-[40px] h-[40px]`;
const TtsUI = tw.div` flex flex-row bg-[#F5F5F5] p-3 items-center rounded-lg justify-between w-full`;
const TtsContentUI = tw.p`w-[220px]`;
const TtsTimeInfoUI = tw.p``;

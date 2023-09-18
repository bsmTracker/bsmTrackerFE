import { useEffect, useState } from "react";
import { Tts } from "@/types/tts";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { useAddTtsMutation } from "@/query/tts";
import tw from "tailwind-styled-components";

export const TTSCo = ({ setTTS, tts }: { setTTS: any; tts?: Tts | null }) => {
  const addTtsMutation = useAddTtsMutation();
  const [content, setContent] = useState("");

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
          <DeleteIcon onClick={removeBtnHandler} />
        </TtsUI>
      )}
    </TtsCoUI>
  );
};

const TtsCoUI = tw.div`flex flex-row gap-2 items-center`;
const RowUI = tw.div`flex flex-row`;
const InputUI = tw.input`w-[300px] h-[40px] p-2 bg-[#F5F5F5]`;
const ButtonUI = tw.button`bg-black text-white w-[40px] h-[40px]`;
const TtsUI = tw.div` flex flex-row gap-2 bg-[#F5F5F5] p-3 items-center max-w-[400px] rounded-lg`;
const TtsContentUI = tw.p``;
const TtsTimeInfoUI = tw.p`w-[60px]`;

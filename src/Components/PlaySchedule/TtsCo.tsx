import { useState } from "react";
import { Tts } from "@/types/tts";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { useAddTtsMutation } from "@/query/tts";

export const TTSCo = ({ setTTS, tts }: { setTTS: any; tts?: Tts | null }) => {
  const addTtsMutation = useAddTtsMutation();

  const [content, setContent] = useState(tts?.content ?? "");

  return (
    <div className="flex flex-row gap-2 items-center">
      tts :
      {!tts && (
        <div>
          <input
            className="w-[300px] h-[40px] p-2 bg-[#F5F5F5]"
            placeholder="이곳에 내용을 입력"
            value={content}
            onChange={(e: any) => setContent(e.target.value)}
          />
          <button
            onClick={async () => {
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
            }}
            className="bg-black text-white w-[40px] h-[40px]"
          >
            등록
          </button>
        </div>
      )}
      {tts && (
        <div className=" flex flex-row gap-2 bg-[#F5F5F5] p-3 items-center max-w-[400px] rounded-lg">
          <p>{tts.content}</p>{" "}
          <p className="w-[60px]">{Math.round(tts.duration_ms / 1000)}초</p>{" "}
          <DeleteIcon
            onClick={() => {
              //삭제까지
              const content = tts.content;
              setContent(content);
              setTTS(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

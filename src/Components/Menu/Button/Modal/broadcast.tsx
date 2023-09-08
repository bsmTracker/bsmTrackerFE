import { ModalUI } from "@/Components/globalStyle";
import { useBroadCastMutation } from "@/query/playSchedule";
import { useState } from "react";
import { toast } from "react-toastify";
import tw from "tailwind-styled-components";

const BroadcastModal = ({ open, close }: { open: boolean; close: any }) => {
  const broadcastMutation = useBroadCastMutation();
  const [content, setContent] = useState<string>("");
  const [volume, setVolume] = useState<number>(50);

  return (
    <ModalUI open={open}>
      <BroadcastInfoWrapperUI>
        <BroadcastTitleUI>실시간 방송하기</BroadcastTitleUI>
        <BroadcastTextareaUI
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="방송할 내용을 입력해주세요"
        />
        <RowUI>
          <p>음량</p>
          <input
            type="range"
            max={"100"}
            min={"20"}
            value={volume}
            onChange={(e: any) => setVolume(Number(e.target.value))}
          />
          <p>{volume}%</p>
        </RowUI>
        <RowUI>
          <BroadcastButtonUI
            onClick={async () => {
              if (content?.length <= 5) {
                toast("내용은 6자 이상 입력해주세요.");
                return;
              }
              await broadcastMutation.mutateAsync({ content, volume });
            }}
          >
            방송하기
          </BroadcastButtonUI>
          <BroadcastButtonUI onClick={close}>닫기</BroadcastButtonUI>
        </RowUI>
      </BroadcastInfoWrapperUI>
    </ModalUI>
  );
};

export default BroadcastModal;

const BroadcastInfoWrapperUI = tw.div`flex flex-col w-full gap-3 justify-center items-center max-w-[300px] absolute bg-gray-100 p-[30px] w-[280px] h-[300px] rounded-lg p-3`;
const BroadcastTitleUI = tw.a`text-[30px] font-bold`;
const BroadcastTextareaUI = tw.textarea`p-3 h-[100px]`;
const BroadcastButtonUI = tw.button`bg-black text-white p-2`;
const RowUI = tw.div`flex flex-row justify-center items-center gap-3`;

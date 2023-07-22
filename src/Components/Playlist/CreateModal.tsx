import { useState } from "react";
import { useAddPlaylistMutation } from "@/query/playlist";

export const CreatePlaylistModal = ({ closeModal }: { closeModal?: any }) => {
  const [name, setName] = useState("");
  const addPlaylistMutation = useAddPlaylistMutation();

  return (
    <div className="bg-white p-[50px] flex flex-col justify-center items-center gap-3">
      <div className="flex flex-col gap-2 bg-white">
        <p className="text-[30px]">재생목록 명</p>
        <input
          className="bg-[#F3F3F3] w-[300px] h-[50px] py-1 px-2 rounded-lg"
          placeholder="ex) 기상시간"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-3">
        <button
          onClick={async () => {
            await addPlaylistMutation.mutateAsync({
              name,
            });
            closeModal();
          }}
          className="bg-black text-white p-2 w-[150px]  text-[30px]"
        >
          추가
        </button>
        <button
          onClick={() => closeModal()}
          className="bg-black text-white p-2 w-[150px] text-[30px]"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

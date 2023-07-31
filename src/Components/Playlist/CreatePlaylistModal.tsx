import { useState } from "react";
import { useAddPlaylistMutation } from "@/query/playlist";
import tw from "tailwind-styled-components";
export const CreatePlaylistModal = ({ closeModal }: { closeModal?: any }) => {
  const [name, setName] = useState("");

  const addPlaylistMutation = useAddPlaylistMutation();

  const addPlaylistHandler = async () => {
    await addPlaylistMutation.mutateAsync({
      name,
    });
    closeModal();
  };

  return (
    <CreatePlaylistUI>
      <ModalExplainUI>재생목록 추가</ModalExplainUI>
      <InputUI
        placeholder="ex) 기상시간"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <ButtonGroupUI>
        <ButtonUI onClick={addPlaylistHandler}>추가</ButtonUI>
        <ButtonUI onClick={closeModal}>닫기</ButtonUI>
      </ButtonGroupUI>
    </CreatePlaylistUI>
  );
};

const CreatePlaylistUI = tw.div`bg-white p-[50px] flex flex-col justify-center items-center gap-3 rounded-lg`;
const ModalExplainUI = tw.p`text-[25px]`;
const InputUI = tw.input`bg-[#F3F3F3] w-[300px] h-[50px] py-1 px-2 rounded-lg`;
const ButtonGroupUI = tw.div`flex flex-row gap-3`;
const ButtonUI = tw.button`bg-black text-white p-2 w-[150px] text-[30px]`;

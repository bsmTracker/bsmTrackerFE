import { useMutation } from "react-query";
import axios from "../axios";
import { Tts } from "@/types/tts";

const useAddTtsMutation = () => {
  return useMutation({
    mutationFn: async (data: { tts: string }) =>
      axios.post(`/api/tts`, data).then((res) => res?.data as Tts),
  });
};

const useRemoveTtsMutation = () => {
  return useMutation({
    mutationFn: async (ttsId: number) => {
      await axios.delete(`/api/tts/${ttsId}`);
    },
  });
};

export { useAddTtsMutation, useRemoveTtsMutation };

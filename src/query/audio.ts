import { useMutation, useQueryClient } from "react-query";
import axios from "../axios";
import { Audio } from "@/types/audio";

const addAudioMutation = () => {
  return useMutation({
    mutationFn: async (data: Audio) =>
      axios.post(`/api/audio`, data).then((res) => res?.data as Audio),
  });
};

const useRemoveAudioMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (audioId: number) => {
      await axios.delete(`/api/audio/${audioId}`);
    },
  });
};

export { addAudioMutation, useRemoveAudioMutation };

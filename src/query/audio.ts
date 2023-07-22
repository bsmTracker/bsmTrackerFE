import { useMutation } from "react-query";
import axios from "../axios";
import { Audio } from "@/types/audio";

const addAudioMutation = () => {
  return useMutation({
    mutationFn: async (data: Audio) =>
      axios.post(`/api/audio`, data).then((res) => res?.data as Audio),
  });
};

export { addAudioMutation };

import axios from "axios";
import { useMutation } from "react-query";

const useSpeakerMutation = () => {
  return useMutation({
    mutationFn: async (volume: number) => {
      await axios.post("/api/speaker", {
        volume,
      });
    },
  });
};

export { useSpeakerMutation };

import axios from "../axios";
import { useMutation } from "react-query";

const usePlayerVolumeMutation = () => {
  return useMutation({
    mutationFn: async (volume: number) => {
      await axios.post("/api/player/volume", {
        volume,
      });
    },
  });
};

export { usePlayerVolumeMutation };

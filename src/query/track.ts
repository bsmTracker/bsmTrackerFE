import { useMutation, useQueryClient } from "react-query";
import axios from "../axios";
import { PLAYLIST_CACHE_KEYS } from "./queryKey";

//mutations
const useSaveTrackMutation = (playlistId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (code: string) =>
      await axios.post("/api/track/save", {
        playlistId,
        code,
      }),
    onSettled: async () => {
      await queryClient.invalidateQueries(
        PLAYLIST_CACHE_KEYS.playlistDetailKey(playlistId)
      );
    },
  });
};

const useUnSaveTrackMutation = (playlistId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (code: string) =>
      await axios.post("/api/track/unSave", {
        playlistId,
        code,
      }),
    onSettled: async () => {
      await queryClient.invalidateQueries(
        PLAYLIST_CACHE_KEYS.playlistDetailKey(playlistId)
      );
    },
  });
};

const useSortTrackMutation = (playlistId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { fromIndex: number; toIndex: number }) => {
      await axios.post("/api/track/changeTrackOrder", { ...data, playlistId });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(
        PLAYLIST_CACHE_KEYS.playlistDetailKey(playlistId)
      );
    },
  });
};

export { useUnSaveTrackMutation, useSortTrackMutation, useSaveTrackMutation };

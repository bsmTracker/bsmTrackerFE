import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "../axios";
import qs from "qs";
import { PLAYLIST_CACHE_KEYS } from "./queryKey";
import { Playlist } from "@/types/playlist";
import { SearchedTrack } from "@/types/track";
/** Queries */
const usePlaylistListQuery = () => {
  return useQuery({
    queryKey: PLAYLIST_CACHE_KEYS.playlistListKey,
    queryFn: async () =>
      axios.get("/api/playlist").then((res) => res?.data as Playlist[]),
  });
};

const usePlaylistDetailQuery = (playlistId: number) => {
  return useQuery({
    queryKey: PLAYLIST_CACHE_KEYS.playlistDetailKey(playlistId),
    queryFn: async () => {
      return axios
        .get(`/api/playlist/${playlistId}`)
        .then((res) => res?.data as Playlist);
    },
  });
};

const useSearchTrackQuery = (playlistId: number, keyword: string) => {
  return useQuery({
    queryKey: PLAYLIST_CACHE_KEYS.searchKey(playlistId),
    queryFn: async () => {
      const queryStr = qs.stringify({
        q: keyword,
        playlistId,
      });
      return axios
        .get(`/api/track/search?${queryStr}`)
        .then((res) => res?.data as SearchedTrack[]);
    },
  });
};

/** Mutations */

const useAddPlaylistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string }) =>
      await axios.post("/api/playlist", data),
    onSettled: async () => {
      await queryClient.invalidateQueries(PLAYLIST_CACHE_KEYS.playlistListKey);
    },
  });
};

const useDeletePlaylistMutation = (playlistId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_: null) => {
      await axios.delete(`/api/playlist/${playlistId}`);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(PLAYLIST_CACHE_KEYS.playlistListKey);
    },
  });
};

export {
  usePlaylistListQuery,
  useAddPlaylistMutation,
  useSearchTrackQuery,
  usePlaylistDetailQuery,
  useDeletePlaylistMutation,
};

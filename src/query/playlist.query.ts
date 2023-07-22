import { useQuery } from "react-query";
import axios from "../axios";

export const PlaylistQueryKey = ["playlist", "list"];
const playlistUrl = "/api/playlist";
export const usePlaylistsQuery = () => {
  const playlistsQuery = useQuery({
    queryKey: PlaylistQueryKey,
    queryFn: () => axios.get(playlistUrl).then((res) => res.data),
  });
  return { playlistsQuery };
};

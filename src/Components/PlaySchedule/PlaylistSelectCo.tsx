import { usePlaylistListQuery } from "@/query/playlist";
import { Playlist } from "@/types/playlist";
import tw from "tailwind-styled-components";

export const PlaylistSelectCo = ({
  selectedPlaylist,
  setSelectedPlaylist,
}: {
  selectedPlaylist?: Playlist | null;
  setSelectedPlaylist: any;
}) => {
  const playlistListQuery = usePlaylistListQuery();

  const changeHandler = async (e: any) => {
    if (e.target.value != 0) {
      const selected = playlistListQuery?.data?.find(
        (playlist: Playlist) => playlist.id === Number(e.target.value)
      );
      setSelectedPlaylist(selected);
    } else {
      setSelectedPlaylist(null);
    }
  };

  return (
    <PlaylistSelectCoUI>
      플레이리스트 선택 :{" "}
      <select value={selectedPlaylist?.id || 0} onChange={changeHandler}>
        <option value={0}>없음</option>
        {playlistListQuery?.data?.map((playlist: Playlist) => {
          return (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          );
        })}
      </select>
    </PlaylistSelectCoUI>
  );
};

const PlaylistSelectCoUI = tw.div`flex flex-row gap-2`;

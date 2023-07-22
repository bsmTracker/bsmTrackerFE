import { usePlaylistListQuery } from "@/query/playlist";
import { Playlist } from "@/types/playlist";
import { useMemo } from "react";

export const PlaylistSelect = ({
  selectedPlaylist,
  setSelectedPlaylist,
}: {
  selectedPlaylist?: Playlist | null;
  setSelectedPlaylist: any;
}) => {
  const playlistListQuery = usePlaylistListQuery();

  const select = useMemo(
    () => (
      <select
        defaultValue={selectedPlaylist?.id || 0}
        onChange={async (e: any) => {
          if (e.target.value != 0) {
            const selected = playlistListQuery?.data?.find(
              (playlist: Playlist) => playlist.id === Number(e.target.value)
            );
            setSelectedPlaylist(selected);
          } else {
            setSelectedPlaylist(null);
          }
        }}
      >
        <option key={0} value={0}>
          없음
        </option>
        {playlistListQuery?.data?.map((playlist: Playlist) => {
          return (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          );
        })}
      </select>
    ),
    [selectedPlaylist?.id]
  );

  return (
    <div className="flex flex-row gap-2">플레이리스트 선택 : {select}</div>
  );
};

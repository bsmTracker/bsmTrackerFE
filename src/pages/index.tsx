import { Header } from "@/Components/Header";
import { Playlist } from "@/types/playlist";
import { PlaySchedule } from "@/types/playSchedule";
import { PlaylistCo } from "@/Components/Playlist/PlaylistCo";
import { PlayScheduleCo } from "@/Components/PlaySchedule/PlayScheduleCo";
import { CreateIcon } from "@/Components/Icon/CreateIcon";
import { useEffect, useState } from "react";
import { CreatePlaylistModal } from "@/Components/Playlist/CreatePlaylistModal";
import { usePlaylistListQuery } from "@/query/playlist";
import { usePlayScheduleListQuery } from "@/query/playSchedule";
import tw from "tailwind-styled-components";
import AddEditPlayScheduleModal from "@/Components/PlaySchedule/AddEditModal";
import { playScheduleSocket } from "@/socket/play-schedule";
import Menu from "@/Components/Menu";

function Home() {
  const playScheduleListQuery = usePlayScheduleListQuery();
  const playlistListQuery = usePlaylistListQuery();

  const [addPlayScheduleModal, setAddPlayScheduleModal] =
    useState<boolean>(false);

  const [editPlaySchedule, setEditPlaySchedule] = useState<
    PlaySchedule | undefined
  >(undefined);

  const [createPlaylistModal, setCreatePlaylistModal] =
    useState<boolean>(false);

  const [nowPlaying, setNowPlaying] = useState<PlaySchedule | null>(null);

  useEffect(() => {
    playScheduleSocket.connect();
    playScheduleSocket.on("now-play-schedule", (nowPlayingSchedule) => {
      setNowPlaying(nowPlayingSchedule);
    });
    return () => {
      playScheduleSocket.disconnect();
    };
  }, [playScheduleSocket]);

  return (
    <MainUI>
      <Header />
      <Menu />
      <WrapperUI>
        <WrapperHeaderUI>
          <WrapperTitleUI>
            플레이리스트 ({playlistListQuery?.data?.length}개)
          </WrapperTitleUI>
          <CreateIcon onClick={() => setCreatePlaylistModal(true)} />
        </WrapperHeaderUI>
        <WrapperContentUI>
          {playlistListQuery?.data?.map((playlist: Playlist) => (
            <PlaylistCo key={playlist.id} playlist={playlist} />
          ))}
        </WrapperContentUI>
      </WrapperUI>
      <WrapperUI>
        <WrapperHeaderUI>
          <WrapperTitleUI>
            플레이스케줄 ({playScheduleListQuery?.data?.length}건)
          </WrapperTitleUI>
          <CreateIcon onClick={() => setAddPlayScheduleModal(true)} />
        </WrapperHeaderUI>
        <WrapperContentUI>
          {playScheduleListQuery?.data?.map((schedule: PlaySchedule) => (
            <PlayScheduleCo
              key={schedule.id}
              nowPlaying={schedule?.id === nowPlaying?.id}
              schedule={schedule}
              onClick={() => {
                setEditPlaySchedule(schedule);
              }}
            />
          ))}
        </WrapperContentUI>
      </WrapperUI>
      <AddEditPlayScheduleModal
        open={addPlayScheduleModal}
        type={"post"}
        closeModal={() => {
          setAddPlayScheduleModal(false);
        }}
      />
      <AddEditPlayScheduleModal
        open={editPlaySchedule ? true : false}
        playSchedule={editPlaySchedule}
        type="put"
        closeModal={() => {
          setEditPlaySchedule(undefined);
        }}
      />
      <CreatePlaylistModal
        open={createPlaylistModal}
        closeModal={() => setCreatePlaylistModal(false)}
      />
    </MainUI>
  );
}

const MainUI = tw.div`pb-[30px]`;
const WrapperUI = tw.div`flex flex-col pt-[30px] pl-[30px] gap-4`;
const WrapperHeaderUI = tw.div`flex flex-row gap-6`;
const WrapperTitleUI = tw.h1`text-[30px]`;
const WrapperContentUI = tw.div`flex flex-row gap-4 overflow-x-scroll pr-[100px]`;

export default Home;

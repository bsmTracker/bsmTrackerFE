import { Header } from "@/Components/Header";
import { Playlist } from "@/types/playlist";
import { PlaySchedule } from "@/types/playSchedule";
import { PlaylistCo } from "@/Components/Playlist/PlaylistCo";
import { PlayScheduleCo } from "@/Components/PlaySchedule/PlayScheduleCo";
import { CreateIcon } from "@/Components/Icon/CreateIcon";
import { useState } from "react";
import { AddEditPlayScheduleModal } from "@/Components/PlaySchedule/AddEditModal";
import { CreatePlaylistModal } from "@/Components/Playlist/CreatePlaylistModal";
import { usePlaylistListQuery } from "@/query/playlist";
import { usePlayScheduleListQuery } from "@/query/playSchedule";
import { ModalUI } from "@/Components/globalStyle";
import tw from "tailwind-styled-components";

function Home() {
  const playScheduleListQuery = usePlayScheduleListQuery();
  const playlistListQuery = usePlaylistListQuery();
  const [playScheduleModal, setPlayScheduleModal] = useState(false);
  const [createPlaylistModal, setCreatePlaylistModal] = useState(false);

  return (
    <MainUI>
      <Header />
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
          <CreateIcon onClick={() => setPlayScheduleModal(true)} />
        </WrapperHeaderUI>
        <WrapperContentUI>
          {playScheduleListQuery?.data?.map((schedule: PlaySchedule) => {
            return <PlayScheduleCo key={schedule.id} schedule={schedule} />;
          })}
        </WrapperContentUI>
      </WrapperUI>
      <ModalUI open={playScheduleModal}>
        <AddEditPlayScheduleModal
          type="post"
          closeModal={() => setPlayScheduleModal(false)}
        />
      </ModalUI>
      <ModalUI open={createPlaylistModal}>
        <CreatePlaylistModal closeModal={() => setCreatePlaylistModal(false)} />
      </ModalUI>
    </MainUI>
  );
}

const MainUI = tw.div``;
const WrapperUI = tw.div`flex flex-col p-[30px] gap-4`;
const WrapperHeaderUI = tw.div`flex flex-row gap-4`;
const WrapperTitleUI = tw.h1`text-[30px]`;
const WrapperContentUI = tw.div`flex flex-row gap-4 overflow-x-scroll`;

export default Home;

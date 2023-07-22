import { Header } from "@/Components/Header";
import { Playlist } from "@/types/playlist";
import { PlaySchedule } from "@/types/playSchedule";
import { PlaylistCo } from "@/Components/Playlist/Playlist";
import { PlayScheduleCo } from "@/Components/PlaySchedule/PlaySchedule";
import { CreateIcon } from "@/Components/Icon/CreateIcon";
import { useState } from "react";
import { AddEditPlayScheduleModal } from "@/Components/PlaySchedule/AddEditModal";
import { Modal } from "@mui/material";
import { CreatePlaylistModal } from "@/Components/Playlist/CreateModal";
import { usePlaylistListQuery } from "@/query/playlist";
import { usePlayScheduleListQuery } from "@/query/playSchedule";

function Home() {
  const playScheduleListQuery = usePlayScheduleListQuery();
  const playlistListQuery = usePlaylistListQuery();
  const [playScheduleModal, setPlayScheduleModal] = useState(false);
  const [createPlaylistModal, setCreatePlaylistModal] = useState(false);

  return (
    <div>
      <Header />
      <div className="p-[30px]">
        <div>
          <div className="flex flex-row gap-4">
            <h1 className="text-[30px]">
              플레이리스트 ({playlistListQuery?.data?.length}개)
            </h1>
            <CreateIcon onClick={() => setCreatePlaylistModal(true)} />
          </div>
          <div className="flex flex-row my-[30px] gap-3 overflow-x-scroll">
            {playlistListQuery?.data?.map((playlist: Playlist) => (
              <PlaylistCo key={playlist.id} playlist={playlist} />
            ))}
          </div>
          <div className="flex flex-row gap-4">
            <h1 className="text-[30px]">
              플레이스케줄 ({playScheduleListQuery?.data?.length}건)
            </h1>
            <CreateIcon onClick={() => setPlayScheduleModal(true)} />
          </div>
          <div className="flex flex-row my-[30px] gap-3 overflow-x-scroll">
            {playScheduleListQuery?.data?.map((schedule: PlaySchedule) => {
              return <PlayScheduleCo key={schedule.id} schedule={schedule} />;
            })}
          </div>
        </div>
      </div>
      <Modal
        open={playScheduleModal}
        onClose={() => setPlayScheduleModal(false)}
        className="flex items-center justify-center"
      >
        <AddEditPlayScheduleModal
          type="post"
          closeModal={() => setPlayScheduleModal(false)}
        />
      </Modal>
      <Modal
        className="flex items-center justify-center"
        open={createPlaylistModal}
        onClose={() => setCreatePlaylistModal(false)}
      >
        <CreatePlaylistModal closeModal={() => setCreatePlaylistModal(false)} />
      </Modal>
    </div>
  );
}

export default Home;

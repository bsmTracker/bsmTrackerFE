import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { CreateIcon } from "@/Components/Icon/CreateIcon";
import { DeleteIcon } from "@/Components/Icon/DeleteIcon";
import { Track } from "@/types/track";
import TrackCo from "@/Components/Track/TrackCo";
import SearchTrack from "@/Components/Playlist/SearchTrackModal";
import {
  useDeletePlaylistMutation,
  usePlaylistDetailQuery,
} from "@/query/playlist";
import { useSortTrackMutation } from "@/query/track";
import tw from "tailwind-styled-components";
import { FcMusic } from "react-icons/fc";

const PlaylistDetail = () => {
  const router = useRouter();

  const playlistId = Number(router.query.id);

  //track queries
  const playlistDetailQuery = usePlaylistDetailQuery(playlistId);

  const playlist = useMemo(() => {
    return playlistDetailQuery?.data;
  }, [playlistDetailQuery?.data, playlistId]);

  const sortTrackMutation = useSortTrackMutation(playlistId);
  const deletePlaylistMutation = useDeletePlaylistMutation(playlistId);

  const [addTrackModal, setAddTrackModal] = useState(false);
  const [draggedFrom, setDraggedFrom] = useState<number | null>(null);
  const [draggedTo, setDraggedTo] = useState<number | null>(null);
  const [dragDrop, setDragDropEvent] = useState(false);

  // 사용자가 객체(object)를 드래그하려고 시작할 때 발생함.
  const onDragStart = (event: any) => {
    event.currentTarget.style.opacity = "0.4";
    const draggedFrom = parseInt(event.currentTarget.dataset.position);
    setDraggedFrom(draggedFrom);
  };

  // 드래그하면서 마우스가 대상 객체의 위에 자리 잡고 있을 때 발생함.
  const onDragOver = (event: any) => {
    event.preventDefault();
    // const draggedFrom = dragAndDrop.draggedFrom; // 드래그 되는 항목의 인덱스(시작)
    event.currentTarget.style.backgroundColor = "gray";
    const draggedTo = parseInt(event.currentTarget.dataset.position); // 놓을 수 있는 영역의 인덱스(끝)
    setDraggedTo(draggedTo);
  };

  const onDrop = async (event: any) => {
    event.currentTarget.style.backgroundColor = "#F5F5F5";
    setDragDropEvent((prev) => !prev);
  };

  const onDragLeave = (event: any) => {
    event.currentTarget.classList.remove("over");
    event.currentTarget.style.backgroundColor = "#F5F5F5";
    setDraggedTo(null);
  };

  const onDragEnter = (event: any) => {
    event.currentTarget.classList.add("over");
  };

  const onDragEnd = (event: any) => {
    event.currentTarget.style.opacity = "1";
    const listItens = document.querySelectorAll(".draggable");
    listItens.forEach((item) => {
      item.classList.remove("over");
    });
  };

  useEffect(() => {
    (async () => {
      console.log(draggedTo, draggedFrom);
      if (!draggedTo || !draggedFrom) return;
      if (draggedFrom !== draggedTo) {
        await sortTrackMutation.mutateAsync({
          toIndex: draggedTo,
          fromIndex: draggedFrom,
        });
      }
    })();
  }, [dragDrop]);

  const draggObjectRef: any = {
    onDragStart,
    onDragOver,
    onDrop,
    onDragLeave,
    onDragEnter,
    onDragEnd,
  };

  const deletBtnHandler = async () => {
    await deletePlaylistMutation.mutateAsync(null, {
      onSuccess: () => {
        router.back();
      },
    });
  };

  return (
    <PlaylistUI>
      <PlaylistInfoUI>
        <PlaylistInfoTextWrapperUI>
          <PlaylistNameUI>{playlist?.name}</PlaylistNameUI>
          <InfoTextUI>총 {playlist?.trackCount}개의 트랙</InfoTextUI>
          <InfoTextUI>
            총 {Math.floor((playlist?.duration_s ?? 0) / 60 ** 2)}시간{" "}
            {Math.floor((playlist?.duration_s ?? 0) / 60)}분{" "}
            {Math.floor((playlist?.duration_s ?? 0) % 60)}초
          </InfoTextUI>
        </PlaylistInfoTextWrapperUI>
        <IconWrapperUI>
          <CreateIcon onClick={() => setAddTrackModal(true)} />
          <DeleteIcon onClick={deletBtnHandler} />
        </IconWrapperUI>
      </PlaylistInfoUI>
      <PlaylistTrackListWrapperUI>
        {playlist?.tracks?.map((track: Track, playlistIdx: number) => {
          return (
            <TrackCo
              key={track.id}
              draggable={true}
              data-position={track.order}
              {...draggObjectRef}
              track={track}
              order={playlistIdx + 1}
            />
          );
        })}
      </PlaylistTrackListWrapperUI>
      {playlist?.tracks?.length === 0 && (
        <NoTracksUI>
          <FcMusic size={100} />
          <p>트랙을 어서 추가하세요!</p>
        </NoTracksUI>
      )}
      <SearchTrack
        open={addTrackModal}
        playlistId={playlistId}
        close={() => setAddTrackModal(false)}
      />
    </PlaylistUI>
  );
};

const PlaylistUI = tw.div`p-[20px] sm:px-[20px] md:px-[30px] lg:px-[40px]`;
const PlaylistInfoUI = tw.div`flex flex-row justify-between items-center bg-white`;
const PlaylistInfoTextWrapperUI = tw.div`flex flex-col justify-center`;
const PlaylistNameUI = tw.p`text-[50px] font-bold`;
const InfoTextUI = tw.p`text-[25px]`;
const PlaylistTrackListWrapperUI = tw.div`flex flex-col mt-[40px] p-1 gap-3`;
const IconWrapperUI = tw.div`flex flex-col justify-between gap-3`;
const NoTracksUI = tw.div`flex flex-col justify-center items-center gap-3 mt-[15px] text-[20px]`;

export default PlaylistDetail;

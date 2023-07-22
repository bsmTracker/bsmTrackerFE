import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/Components/Header";
import { CreateIcon } from "@/Components/Icon/CreateIcon";
import { DeleteIcon } from "@/Components/Icon/DeleteIcon";
import { Track } from "@/types/track";
import TrackCo from "@/Components/Playlist/Track";
import { Modal } from "@mui/material";
import SearchTrack from "@/Components/Playlist/Search";
import { OrderIcon } from "@/Components/Icon/OrderIcon";
import { usePlaylistDetailQuery } from "@/query/playlist";
import { useSortTrackMutation, useUnSaveTrackMutation } from "@/query/track";

const PlaylistDetail = () => {
  const router = useRouter();

  const playlistId = useMemo(() => {
    return Number(router.query.id);
  }, [router.query]);

  const playlistDetailQuery = usePlaylistDetailQuery(playlistId);

  const playlist = useMemo(() => {
    return playlistDetailQuery.data;
  }, [playlistDetailQuery.data]);

  //track queries
  const unSaveTrackMutation = useUnSaveTrackMutation(playlistId);
  const sortTrackMutation = useSortTrackMutation(playlistId);

  const [addTrackModal, setAddTrackModal] = useState(false);
  const [listMode, setListMode] = useState<"none" | "select" | "sort">("none");
  const [selectedList, setSelectList] = useState<Track[]>([]);
  const [draggedFrom, setDraggedFrom] = useState<number | null>(null);
  const [draggedTo, setDraggedTo] = useState<number | null>(null);
  const [dragDrop, setDragDropEvent] = useState(false);

  useEffect(() => {
    if (listMode !== "select") setSelectList([]);
  }, [listMode]);

  const SelectBtn = () => {
    return (
      <>
        {selectedList.length > 0 && (
          <button
            onClick={async () => {
              selectedList.map(async (selected) => {
                await unSaveTrackMutation.mutateAsync(selected.code);
              });
              setListMode("none");
            }}
            className="bg-black text-white w-[100px] h-[40px]"
          >
            {selectedList.length}개 삭제하기
          </button>
        )}
      </>
    );
  };

  const SelectUI = ({ track }: { track: Track }) => {
    return (
      <input
        checked={
          selectedList.find(
            (selected) => selected.playlistId === track.playlistId
          )
            ? true
            : false
        }
        onChange={(e) => {
          if (
            !selectedList.find(
              (selected) => selected.playlistId === track.playlistId
            )
          ) {
            setSelectList([...selectedList, track]);
          } else {
            setSelectList(
              selectedList.filter(
                (selected) => selected.playlistId !== track.playlistId
              )
            );
          }
        }}
        type="checkbox"
        className="w-[10px] h-[10px]"
      />
    );
  };

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
      if (!draggedTo || !draggedFrom) return;
      if (draggedFrom !== draggedTo) {
        sortTrackMutation.mutateAsync({
          toIndex: draggedTo,
          fromIndex: draggedFrom,
        });
      }
    })();
  }, [dragDrop]);

  return (
    <>
      <Header />
      <div className="flex flex-row p-[50px] justify-between items-center bg-white">
        <div className="flex flex-col justify-center">
          <p className="text-[50px] font-bold">{playlist?.name}</p>
          <p className="text-[25px]">총 {playlist?.trackCount}개의 트랙</p>
          <p className="text-[25px]">
            총 {Math.floor((playlist?.duration_s ?? 0) / 60 ** 2)}시간{" "}
            {Math.floor((playlist?.duration_s ?? 0) / 60)}분{" "}
            {Math.floor((playlist?.duration_s ?? 0) % 60)}초
          </p>
        </div>
        <div className="flex flex-col justify-between gap-3">
          <CreateIcon onClick={() => setAddTrackModal(true)} />
          <DeleteIcon onClick={() => setListMode("select")} />
          <OrderIcon onClick={() => setListMode("sort")} />
        </div>
      </div>
      <div className="px-[50px] mb-[100px]">
        {useMemo(() => {
          return playlist?.tracks?.map((track: Track, playlistIdx: number) => {
            return (
              <div
                key={track.playlistId}
                className="flex items-center bg-[#F5F5F5] px-[10px] gap-3 my-[5px] min-h-[100px] max-h-[190px] rounded-lg"
                draggable={listMode === "sort"}
                data-position={track.order}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onDragEnter={onDragEnter}
                onDragEnd={onDragEnd}
              >
                {listMode === "sort" && <p>{playlistIdx + 1}</p>}
                {listMode === "select" && <SelectUI track={track} />}
                <TrackCo track={track} showOption={listMode === "none"} />
              </div>
            );
          });
        }, [playlist?.tracks, selectedList, listMode])}

        {listMode !== "none" && (
          <div className="fixed bottom-0 w-full flex flex-row gap-3 justify-center items-center h-[100px] bg-white">
            {listMode === "select" && <SelectBtn />}
            {listMode === "sort" && (
              <p>마우스로 클릭후 드롭하여 순서를 변경합니다</p>
            )}
            {
              <button
                onClick={() => {
                  setListMode("none");
                }}
                className="bg-black text-white w-[100px] h-[40px]"
              >
                닫기
              </button>
            }
          </div>
        )}
      </div>
      <Modal
        className="flex items-center justify-center"
        open={addTrackModal}
        onClose={() => setAddTrackModal(false)}
      >
        <SearchTrack
          playlistId={playlistId}
          close={() => setAddTrackModal(false)}
        />
      </Modal>
    </>
  );
};

export default PlaylistDetail;

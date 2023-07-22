import { useEffect, useMemo, useState } from "react";
import { SearchedTrack as SearchedTrackType } from "@/types/track";
import { debounce as _debounce } from "lodash";
import SearchedTrack from "./SearchedTrack";
import { Modal } from "@mui/material";
import { useSearchTrackQuery } from "@/query/playlist";
import { useSaveTrackMutation } from "@/query/track";

const SearchTrack = ({
  playlistId,
  close,
}: {
  playlistId: number;
  close: any;
}) => {
  const [inputStr, setInputStr] = useState("");
  const [keyword, setKeyword] = useState<string>("");
  const [keywordTimeout, setKeywordTimeout] = useState<any>(null);
  const [selectedTrack, setSelectedTrack] = useState<SearchedTrackType | null>(
    null
  );

  const searchTrackQuery = useSearchTrackQuery(playlistId, keyword);
  const saveTrackMutation = useSaveTrackMutation(playlistId);

  useEffect(() => {
    searchTrackQuery.refetch();
  }, [keyword]);

  const searchedTracks = useMemo(() => {
    if (searchTrackQuery.isLoading) return [];
    return searchTrackQuery.data;
  }, [searchTrackQuery.data, selectedTrack]);

  useEffect(() => {
    if (keywordTimeout) clearTimeout(keywordTimeout);
    const timeoutO = setTimeout(() => {
      setSelectedTrack(null);
      setKeyword(inputStr);
    }, 500);
    setKeywordTimeout(timeoutO);
  }, [inputStr]);

  return (
    <div className="bg-white p-10 flex flex-col min-w-[180px] w-[500px] rounded-lg ">
      <p className="text-[35px] mb-[10px]">트랙 추가</p>
      <div className="flex flex-row items-center h-[40px]">
        <input
          value={inputStr}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputStr(e.target.value);
          }}
          className="bg-[#F5F5F5] w-full h-full px-5 py-2"
          placeholder="원하는 음악명을 입력해주세요"
        />
        <button
          onClick={() => {
            searchTrackQuery.refetch();
          }}
          className="w-[50px] h-full bg-black text-white"
        >
          검색
        </button>
      </div>
      {searchTrackQuery.isLoading && <p>로딩중</p>}
      <div className="overflow-y-scroll h-[300px] py-[5px] my-[30px] flex flex-col gap-3">
        {searchedTracks?.map(
          (searchedTrack: SearchedTrackType, idx: number) => {
            return (
              <div
                key={searchedTrack.code}
                onClick={() => {
                  if (selectedTrack?.code === searchedTrack.code) {
                    setSelectedTrack(null);
                  } else {
                    setSelectedTrack(searchedTrack);
                  }
                }}
              >
                <SearchedTrack
                  searchedTrack={searchedTrack}
                  selected={selectedTrack?.code === searchedTrack.code}
                />
              </div>
            );
          }
        )}
      </div>
      {selectedTrack && (
        <div className="flex flex-row gap-2 items-center justify-center">
          <button
            onClick={async () => {
              await saveTrackMutation.mutateAsync(selectedTrack.code);
              close();
            }}
            className="bg-black text-white w-[100px] h-[40px]"
          >
            ♫ 저장
          </button>
          <button
            onClick={() =>
              window.open("https://youtube.com/watch?v=" + selectedTrack.code)
            }
            className="bg-black text-white w-[100px] h-[40px]"
          >
            👂 미리듣기
          </button>
        </div>
      )}
      <Modal open={saveTrackMutation.isLoading}>
        <div className="flex flex-col justify-center items-center">
          <img src="https://img.mk.co.kr/mkde/ic_loading_img.gif"></img>
        </div>
      </Modal>
    </div>
  );
};

export default SearchTrack;

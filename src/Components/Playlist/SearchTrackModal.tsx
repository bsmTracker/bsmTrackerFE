import { useEffect, useMemo, useState } from "react";
import { SearchedTrack as SearchedTrackType } from "@/types/track";
import { debounce as _debounce } from "lodash";
import SearchedTrack from "./SearchedTrackCo";
import tw from "tailwind-styled-components";
import { useSearchTrackQuery } from "@/query/playlist";
import { useSaveTrackMutation } from "@/query/track";
import { LoadingCo } from "../global";
import { ModalUI } from "../globalStyle";
import { useQueryClient } from "react-query";
import { PLAYLIST_CACHE_KEYS } from "@/query/queryKey";

const SearchTrackModal = ({
  playlistId,
  open,
  close,
}: {
  playlistId: number;
  open: boolean;
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

  const queryClient = useQueryClient();

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

  const searchBtnHandler = () => searchTrackQuery.refetch();
  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputStr(e.target.value);
  };
  const searchedTrackClickHandler = (searchedTrack: SearchedTrackType) => {
    if (selectedTrack?.code === searchedTrack.code) {
      setSelectedTrack(null);
    } else {
      setSelectedTrack(searchedTrack);
    }
  };
  const saveSelectedTrackBtnHandler = async () => {
    if (selectedTrack) {
      await saveTrackMutation.mutateAsync(selectedTrack.code, {
        onSuccess: async () => {
          await queryClient.invalidateQueries(
            PLAYLIST_CACHE_KEYS.searchKey(playlistId)
          );
        },
      });
    }
  };

  const listenSelectedTrackBtnHandler = () => {
    if (selectedTrack) {
      window.open("https://youtube.com/watch?v=" + selectedTrack.code);
    }
  };

  return (
    <ModalUI open={open} onClose={close}>
      <SearchTrackUI>
        <ModalExplainText>트랙 추가</ModalExplainText>
        <SearchGroupUI>
          <SearchInputUI
            value={inputStr}
            onChange={searchInputHandler}
            placeholder="원하는 음악명을 입력해주세요"
          />
          <SearchBtnUI onClick={searchBtnHandler}>검색</SearchBtnUI>
        </SearchGroupUI>
        {searchTrackQuery.isLoading && <p>로딩중</p>}
        <SearchedTrackScrollWrapperUI>
          {searchedTracks?.map(
            (searchedTrack: SearchedTrackType, idx: number) => {
              const selectedStatus = selectedTrack?.code === searchedTrack.code;
              return (
                <SearchedTrack
                  key={searchedTrack.code}
                  searchedTrack={searchedTrack}
                  selected={selectedStatus}
                  onClick={() => {
                    searchedTrackClickHandler(searchedTrack);
                  }}
                />
              );
            }
          )}
        </SearchedTrackScrollWrapperUI>
        <SearchedTrackBtnGroupUI>
          {selectedTrack && (
            <>
              <SearchedTrackBtnUI onClick={saveSelectedTrackBtnHandler}>
                ♫ 저장
              </SearchedTrackBtnUI>
              <SearchedTrackBtnUI onClick={listenSelectedTrackBtnHandler}>
                👂 미리듣기
              </SearchedTrackBtnUI>
            </>
          )}
          <SearchedTrackBtnUI onClick={close}>닫기</SearchedTrackBtnUI>
        </SearchedTrackBtnGroupUI>
        <LoadingCo isLoading={saveTrackMutation.isLoading} />
      </SearchTrackUI>
    </ModalUI>
  );
};

const SearchTrackUI = tw.div`bg-white p-10 flex flex-col min-w-[180px] w-[500px] rounded-lg`;
const ModalExplainText = tw.p`text-[35px] mb-[10px]`;
const SearchGroupUI = tw.div`flex flex-row items-center h-[40px]`;
const SearchInputUI = tw.input`bg-[#F5F5F5] w-full h-full px-5 py-2`;
const SearchBtnUI = tw.button`w-[50px] h-full bg-black text-white`;
const SearchedTrackScrollWrapperUI = tw.div`overflow-y-scroll h-[300px] py-[5px] my-[30px] flex flex-col gap-3`;
const SearchedTrackBtnGroupUI = tw.div`flex flex-row gap-2 items-center justify-center`;
const SearchedTrackBtnUI = tw.button`bg-black text-white w-[100px] h-[40px]`;

export default SearchTrackModal;

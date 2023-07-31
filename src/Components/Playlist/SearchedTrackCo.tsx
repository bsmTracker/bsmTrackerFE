import { SearchedTrack } from "@/types/track";
import tw from "tailwind-styled-components";

const SearchedTrackCo = ({
  searchedTrack,
  selected,
  onClick,
}: {
  searchedTrack: SearchedTrack;
  selected: boolean;
  onClick: any;
}) => {
  return (
    <SearchedTrackUI selected={selected} onClick={onClick}>
      <SearchedTrackImgUI src={searchedTrack.image} />
      <SearchedTrackInfoTextUI>{searchedTrack.name}</SearchedTrackInfoTextUI>
      <SearchedTrackSaveInfoUI saveStatus={searchedTrack.save}>
        저장됨
      </SearchedTrackSaveInfoUI>
    </SearchedTrackUI>
  );
};

const SearchedTrackUI = tw.div<{
  selected: boolean;
}>`flex flex-row gap-5 cursor-pointer hover:bg-slate-400 ${(props) =>
  props?.selected ? "border-black border-[2px]" : "border-none"}`;
const SearchedTrackImgUI = tw.img`w-[80px] object-cover `;
const SearchedTrackInfoTextUI = tw.p``;
const SearchedTrackSaveInfoUI = tw(SearchedTrackInfoTextUI)<{
  saveStatus: boolean;
}>`
w-[100px] font-bold ${({ saveStatus }) => (saveStatus ? "" : "hidden")}
`;

export default SearchedTrackCo;

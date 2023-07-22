import { SearchedTrack } from "@/types/track";

const SearchedTrack = ({
  searchedTrack,
  selected,
}: {
  searchedTrack: SearchedTrack;
  selected: boolean;
}) => {
  return (
    <div
      className={`flex flex-row gap-5 cursor-pointer hover:bg-slate-400 ${
        selected ? "border-black border-[2px]" : "border-none"
      }`}
    >
      <img className="w-[80px]" src={searchedTrack.image} />
      <p>{searchedTrack.name}</p>
      {searchedTrack.save && <p className="w-[50px] font-bold">저장됨</p>}
    </div>
  );
};

export default SearchedTrack;

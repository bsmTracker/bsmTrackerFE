import { Track } from "@/types/track";
import tw from "tailwind-styled-components";

const TrackInfoCo = ({ track, order }: { track: Track; order: number }) => {
  const duration_s = Math.round(track.duration_ms / 1000);
  const hour = Math.floor(duration_s / 60 ** 2);
  const minute = Math.floor(duration_s / 60);
  const second = Math.floor(duration_s % 60);
  return (
    <TrackInfoCoUI>
      <OrderUI>{order}</OrderUI>
      <TrackImgUI src={track.image} />
      <ColUI>
        <TrackNameUI>{track.name}</TrackNameUI>
        <TrackDetailTextUI>
          {hour}시간 {minute}분 {second}초
        </TrackDetailTextUI>
      </ColUI>
    </TrackInfoCoUI>
  );
};

const TrackInfoCoUI = tw.div`
flex flex-row items-center gap-5
`;

const ColUI = tw.div``;
const TrackNameUI = tw.p`font-bold`;
const TrackDetailTextUI = tw.p``;
const TrackImgUI = tw.img`
w-[180px] h-[110px] object-cover`;

const OrderUI = tw.p`font-bold text-[25px] text-gray-600`;

export default TrackInfoCo;

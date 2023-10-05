import { Track } from "@/types/track";
import tw from "tailwind-styled-components";
import TrackOptionCo from "./TrackOptionCo";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type divElementProp = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type TrackCoProp = { track: Track; order: number };

type Props = divElementProp & TrackCoProp;

const TrackCo = (props: Props) => {
  const { track, order } = props;
  const duration_s = Math.round(track.duration_ms / 1000);
  const hour = Math.floor(duration_s / 60 ** 2);
  const minute = Math.floor(duration_s / 60);
  const second = Math.floor(duration_s % 60);

  return (
    <TrackCoUI {...props}>
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
      <TrackOptionCo track={track} />
    </TrackCoUI>
  );
};

const TrackCoUI = tw.div`
flex flex-row justify-between h-[90px] max-h-[160px] w-full items-center
bg-slate-50 px-[10px] rounded-lg
`;

const TrackInfoCoUI = tw.div`
flex flex-row items-center gap-5
`;
const ColUI = tw.div``;
const TrackNameUI = tw.p`font-bold line-clamp-2 text-ellipsis text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] overflow-hidden ...`;
const TrackDetailTextUI = tw.p`t text-[8px] sm:text-[8px] md:text-[10px] lg:text-[12px]`;
const TrackImgUI = tw.img`hidden sm:flex w-[150px] object-cover h-[90px]`;

const OrderUI = tw.p`font-bold text-[25px] text-gray-600`;

export default TrackCo;

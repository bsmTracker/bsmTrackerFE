import { Track } from "@/types/track";
import tw from "tailwind-styled-components";
import TrackInfoCo from "./TrackInfoCo";
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
  return (
    <TrackCoUI {...props}>
      <TrackInfoCo track={track} order={order} />
      <TrackOptionCo track={track} />
    </TrackCoUI>
  );
};

const TrackCoUI = tw.div`
flex justify-between h-[110px] w-full items-center
bg-[#F5F5F5] px-[10px] gap-3 my-[5px] min-h-[100px] max-h-[190px] rounded-lg
`;

export default TrackCo;

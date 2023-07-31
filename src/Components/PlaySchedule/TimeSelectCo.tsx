import { Time } from "@/types/playSchedule";
import tw from "tailwind-styled-components";

export const TimeSelectCo = ({
  time,
  setTime,
}: {
  time: Time;
  setTime: any;
}) => {
  return (
    <TimeSelectCoUI>
      <TimeSelectUI
        value={time.hour}
        onChange={(e: any) =>
          setTime({
            ...time,
            hour: Number(e.target.value),
          })
        }
      >
        {new Array(24).fill(0).map((_, indx) => (
          <option key={indx} value={indx}>
            {indx}시
          </option>
        ))}
      </TimeSelectUI>
      <TimeSelectUI
        value={time.minute}
        onChange={(e: any) =>
          setTime({
            ...time,
            minute: Number(e.target.value),
          })
        }
      >
        {new Array(60).fill(0).map((_, indx) => (
          <option key={indx} value={indx}>
            {indx}분
          </option>
        ))}
      </TimeSelectUI>
      <TimeSelectUI
        value={time.second}
        onChange={(e: any) =>
          setTime({
            ...time,
            second: Number(e.target.value),
          })
        }
      >
        {new Array(60).fill(0).map((_, indx) => (
          <option key={indx} value={indx}>
            {indx}초
          </option>
        ))}
      </TimeSelectUI>
    </TimeSelectCoUI>
  );
};

const TimeSelectCoUI = tw.div`flex flex-row gap-5`;
const TimeSelectUI = tw.select`w-[90px]`;

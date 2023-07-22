import { Time } from "@/types/playSchedule";

export const TimeSelect = ({ time, setTime }: { time: Time; setTime: any }) => {
  return (
    <div className="flex flex-row gap-5">
      <select
        defaultValue={time.hour}
        onChange={(e: any) =>
          setTime({
            ...time,
            hour: Number(e.target.value),
          })
        }
        className="w-[90px]"
      >
        {new Array(24).fill(0).map((_, indx) => (
          <option key={indx} value={indx}>
            {indx}시
          </option>
        ))}
      </select>
      <select
        defaultValue={time.minute}
        onChange={(e: any) =>
          setTime({
            ...time,
            minute: Number(e.target.value),
          })
        }
        className="w-[90px]"
      >
        {new Array(60).fill(0).map((_, indx) => (
          <option key={indx} value={indx}>
            {indx}분
          </option>
        ))}
      </select>
      <select
        defaultValue={time.second}
        onChange={(e: any) =>
          setTime({
            ...time,
            second: Number(e.target.value),
          })
        }
        className="w-[90px]"
      >
        {new Array(60).fill(0).map((_, indx) => (
          <option key={indx} value={indx}>
            {indx}초
          </option>
        ))}
      </select>
    </div>
  );
};

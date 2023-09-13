import { Header } from "@/Components/Header";
import { usePlayScheduleListQuery } from "@/query/playSchedule";
import { PlaySchedule, ScheduleEnum } from "@/types/playSchedule";
import { useMemo, useState } from "react";
import tw from "tailwind-styled-components";
const Calender = () => {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const [month, setMonth] = useState(nowMonth);
  const playScheduleListQuery = usePlayScheduleListQuery();

  const dateArr = useMemo(() => {
    var first = new Date(nowYear, month - 1, 1);
    var last = new Date(nowYear, month, 0);
    let i = new Date(first.getTime() - first.getTimezoneOffset() * 60000);
    let max = new Date(last.getTime() - last.getTimezoneOffset() * 60000);

    let arr = [];
    while (true) {
      if (i > max) break;
      arr.push({
        string: i.toISOString().substring(0, 10),
        date: i.getDate(),
        day: i.getDay(),
      });
      i.setDate(i.getDate() + 1);
    }
    return arr;
  }, [nowYear, month]);

  const 요일 = ["일", "월", "화", "수", "목", "금", "토"];
  const 스케쥴타입 = {
    [ScheduleEnum.EVENT]: "이벤트",
    [ScheduleEnum.DAYS_OF_WEEK]: "요일형",
  };

  if (playScheduleListQuery?.isLoading) return <div></div>;

  return (
    <div>
      <Header />
      <ScheduleCalenderUI>
        <div className="flex flex-row">
          <h1 className="text-[40px] font-bold">
            {nowYear}년 {month}월 플레이 일정
          </h1>
          <select value={month} onChange={(e: any) => setMonth(e.target.value)}>
            {new Array(12).fill(0).map((_, idx) => {
              return (
                <option key={idx} value={idx + 1}>
                  {idx + 1}월
                </option>
              );
            })}
          </select>
        </div>
        <div className="grid grid-cols-7">
          {new Array(7).fill(0).map((_, idx) => {
            return (
              <p className="flex flex-col justify-center items-center text-[20px] font-bold">
                {요일[idx]}
              </p>
            );
          })}
          {new Array(dateArr?.[0]?.day).fill(0).map((_, idx) => (
            <BlankSquareUI key={idx} />
          ))}
          {dateArr?.map((date) => {
            const schedules = playScheduleListQuery.data?.filter(
              (playSchedule: PlaySchedule) => {
                if (playSchedule.scheduleType === ScheduleEnum.DAYS_OF_WEEK) {
                  if (
                    !playSchedule.daysOfWeek.find(
                      (daysOfWeek) => date.day === daysOfWeek.day
                    )
                  ) {
                    return false;
                  }
                }
                if (playSchedule.scheduleType === ScheduleEnum.EVENT) {
                  if (playSchedule.startDate > date.string) {
                    return false;
                  }
                  if (playSchedule.endDate < date.string) {
                    return false;
                  }
                }
                return true;
              }
            );

            return (
              <DateSquareUI key={date.string}>
                <DateTextUI>{date.date}일</DateTextUI>
                {schedules?.map((playSchedule: PlaySchedule) => {
                  return (
                    <div className="flex flex-row gap-1 items-center">
                      <ExcuteStatus status={playSchedule.active} />
                      <span className="text-[0.9wh]">{playSchedule.name}</span>
                    </div>
                  );
                })}
              </DateSquareUI>
            );
          })}
          {new Array(6 - dateArr?.[dateArr.length - 1]?.day)
            .fill(0)
            .map((_, idx) => (
              <BlankSquareUI key={idx} />
            ))}
        </div>
      </ScheduleCalenderUI>
    </div>
  );
};
export default Calender;
const ScheduleCalenderUI = tw.div`p-[50px] mb-[100px]`;
const BlankSquareUI = tw.div`bg-none m-0 p-1 border-black border-[1px] bg-gray-200`;
const DateSquareUI = tw.div`border-black border-[1px] h-[120px] bg-slate-200 m-0 p-1`;
const DateTextUI = tw.p`text-[20px] font-bold text-black`;
const ExcuteStatus = tw.div`w-[5px] h-[5px] ${({
  status,
}: {
  status: boolean;
}) => (status ? "bg-green-400" : "bg-red-400")} rounded-[100px]`;

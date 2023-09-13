import { useEffect, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import tw from "tailwind-styled-components";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

export const EventSelectCo = ({
  startDateStr,
  endDateStr,
  setStartDateStr,
  setEndDateStr,
}: {
  startDateStr: string;
  endDateStr: string;
  setStartDateStr: any;
  setEndDateStr: any;
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setStartDate(new Date(startDateStr));
    setEndDate(new Date(endDateStr));
  }, [startDateStr, endDateStr]);

  return (
    <EventSelectCoUI>
      <DatePickerUI
        locale="ko"
        selected={startDate}
        dateFormat="yyyy-MM-dd"
        onChange={(date: any) =>
          setStartDateStr(date.toISOString().substring(0, 10))
        }
      />
      부터
      <DatePickerUI
        locale="ko"
        selected={endDate}
        dateFormat="yyyy-MM-dd"
        onChange={(date: any) =>
          setEndDateStr(date.toISOString().substring(0, 10))
        }
      />
      까지
    </EventSelectCoUI>
  );
};

const EventSelectCoUI = tw.div`flex flex-row gap-5`;

const DatePickerUI = tw(
  ReactDatePicker
)`bg-[#f5f5f5] w-[150px] p-2 text-center rounded-lg`;

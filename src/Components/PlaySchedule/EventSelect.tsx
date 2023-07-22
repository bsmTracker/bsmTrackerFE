import { useEffect, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);

export const EventSelect = ({
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
  const [startDate, setStartDate] = useState(new Date(startDateStr));
  const [endDate, setEndDate] = useState(new Date(endDateStr));

  useEffect(() => {
    setStartDateStr(startDate.toISOString().substring(0, 10));
    setEndDateStr(endDate.toISOString().substring(0, 10));
  }, [startDate, endDate]);

  return (
    <div className="flex flex-row gap-5">
      <ReactDatePicker
        className="bg-[#f5f5f5] w-[150px] p-2 text-center rounded-lg"
        locale="ko"
        selected={startDate}
        dateFormat="yyyy-MM-dd"
        onChange={(date: any) => setStartDate(date)}
      />
      부터
      <ReactDatePicker
        className="bg-[#f5f5f5] w-[150px] p-2 text-center rounded-lg"
        locale="ko"
        selected={endDate}
        dateFormat="yyyy-MM-dd"
        onChange={(date: any) => setEndDate(date)}
      />
      까지
    </div>
  );
};

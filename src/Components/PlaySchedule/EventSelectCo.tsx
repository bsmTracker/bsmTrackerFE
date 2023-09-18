import { useEffect, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import tw from "tailwind-styled-components";
import ko from "date-fns/locale/ko";
import { DateEntity } from "@/types/playSchedule";
import { toast } from "react-toastify";
registerLocale("ko", ko);

export const EventSelectCo = ({
  dateList,
  setDateList,
}: {
  dateList: DateEntity[];
  setDateList: any;
}) => {
  const [tempDate, setTempDate] = useState<Date>();

  useEffect(() => {
    setTempDate(new Date());
  }, []);

  const addBtnHandler = () => {
    const targetDateStr = tempDate?.toISOString().substring(0, 10);
    const sameDate = dateList.find((dateE) => dateE.date === targetDateStr);
    if (sameDate) {
      toast("이미 같은 날이 설정 되어있습니다");
      return;
    }
    const dateE = {
      date: targetDateStr,
    };
    setDateList([dateE, ...dateList]);
  };

  const removeBtnHandler = (dateStr: string) => {
    setDateList(dateList?.filter((dateE) => dateE.date !== dateStr));
  };

  return (
    <EventSelectCoUI>
      <DateRegisterGroupUI>
        <DatePickerUI
          locale="ko"
          dateFormat="yyyy-MM-dd"
          selected={tempDate}
          onChange={(date: Date) => setTempDate(date)}
        />
        <RegisterBtnUI onClick={addBtnHandler}>등록</RegisterBtnUI>
      </DateRegisterGroupUI>
      <DateBlockListUI>
        {dateList?.map((dateE: DateEntity) => {
          return (
            <DateBlockUI>
              <p>{dateE.date}</p>
              <button
                className="text-[13px]"
                onClick={() => removeBtnHandler(dateE.date)}
              >
                X
              </button>
            </DateBlockUI>
          );
        })}
      </DateBlockListUI>
    </EventSelectCoUI>
  );
};

const EventSelectCoUI = tw.div`flex flex-row gap-3 items-center`;
const DateRegisterGroupUI = tw.div`flex flex-row`;
const RegisterBtnUI = tw.button`bg-black text-[13px] text-white w-[40px]`;
const DateBlockListUI = tw.div`flex flex-row overflow-x-scroll w-full gap-2`;
const DateBlockUI = tw.div`min-w-[90px] gap-1 px-1 h-[40px] flex flex-row justify-row items-center justify-center text-[10px] bg-gray-100 rounded-lg`;
const DatePickerUI = tw(
  ReactDatePicker
)`bg-[#f5f5f5] w-[110px] h-[40px] p-2 text-center text-[14px]`;

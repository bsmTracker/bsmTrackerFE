import { DaysOfWeek } from "@/types/playSchedule";
import tw from "tailwind-styled-components";

export const DaysOfWeekSelectCo = ({
  selectedDays,
  setSelectedDays,
}: {
  selectedDays: DaysOfWeek[];
  setSelectedDays: Function;
}) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const clickHandler = (index: number) => {
    const isSelected = selectedDays?.find(
      (selectedDayObj) => selectedDayObj.day === index
    );
    if (isSelected) {
      setSelectedDays(
        selectedDays?.filter((selectedDay) => selectedDay.day !== index)
      );
    } else {
      setSelectedDays([
        ...selectedDays,
        {
          day: index,
        },
      ]);
    }
  };

  return (
    <RowUI>
      {days.map((day, index) => {
        const isSelected = selectedDays?.find(
          (selectedDayObj) => selectedDayObj.day === index
        );
        return (
          <DayBtnUI
            key={index}
            onClick={() => {
              clickHandler(index);
            }}
            isselected={String(isSelected ? true : false)}
          >
            {day}
          </DayBtnUI>
        );
      })}
    </RowUI>
  );
};

const RowUI = tw.div`flex flex-row gap-2`;

const DayBtnUI = tw.div`${({ isselected }: { isselected: string }) =>
  isselected === "true"
    ? "bg-black text-white"
    : "bg-[#f3f3f3] text-black"} flex justify-center items-center w-[50px] h-[50px] p-[10px] rounded-[30px] cursor-pointer`;

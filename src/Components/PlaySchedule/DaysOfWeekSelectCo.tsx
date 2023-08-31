import tw from "tailwind-styled-components";

export const DaysOfWeekSelectCo = ({
  selectedDays,
  setSelectedDays,
}: {
  selectedDays: number[];
  setSelectedDays: Function;
}) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const clickHandler = (index: number) => {
    const isSelected = selectedDays?.includes(index);
    if (isSelected) {
      setSelectedDays(
        selectedDays?.filter((selectedDay) => selectedDay !== index)
      );
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  };

  return (
    <RowUI>
      {days.map((day, index) => {
        const isSelected = selectedDays.includes(index);
        return (
          <DayBtnUI
            key={index}
            onClick={() => {
              clickHandler(index);
            }}
            isselected={String(isSelected)}
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

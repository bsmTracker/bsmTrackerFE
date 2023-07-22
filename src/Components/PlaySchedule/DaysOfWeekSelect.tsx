export const DaysOfWeekSelect = ({
  selectedDays,
  setSelectedDays,
}: {
  selectedDays: number[];
  setSelectedDays: Function;
}) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="flex flex-row gap-2">
      {days.map((day, index) => {
        const isSelected = selectedDays.includes(index);
        return (
          <div
            key={index}
            onClick={() => {
              if (isSelected) {
                setSelectedDays(
                  selectedDays.filter((selectedDay) => selectedDay !== index)
                );
              } else {
                setSelectedDays([...selectedDays, index]);
              }
            }}
            className={`${
              isSelected ? "bg-black" : "bg-[#f3f3f3]"
            } flex justify-center items-center ${
              isSelected ? "text-white" : "text-black"
            } w-[50px] h-[50px] p-[10px] rounded-[30px] cursor-pointer`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
};

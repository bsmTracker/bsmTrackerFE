import { BsCalendarFill } from "react-icons/bs";
import { MenuButtonUI } from "./UI";
import { useRouter } from "next/router";

const CalendarBtn = () => {
  const router = useRouter();
  return (
    <MenuButtonUI
      onClick={() => {
        router.push("calendar");
      }}
    >
      <BsCalendarFill size={20} />
      <p>달력</p>
    </MenuButtonUI>
  );
};

export default CalendarBtn;

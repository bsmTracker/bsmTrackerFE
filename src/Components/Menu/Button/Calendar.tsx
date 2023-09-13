import { CalendarIcon } from "@/Components/Icon/Calendar";
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
      <CalendarIcon />
      <p>달력</p>
    </MenuButtonUI>
  );
};

export default CalendarBtn;

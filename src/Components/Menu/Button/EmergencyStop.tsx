import { BsStopBtnFill } from "react-icons/bs";
import { MenuButtonUI } from "./UI";
import { useEmergencyStopPlayScheduleMutation } from "@/query/playSchedule";

const EmergencyStopBtn = () => {
  const emergencyStopMutation = useEmergencyStopPlayScheduleMutation();

  return (
    <MenuButtonUI
      onClick={async () => {
        const answer = confirm("정말로 긴급정지 하시겠습니까?");
        if (answer) {
          await emergencyStopMutation.mutateAsync();
        }
      }}
    >
      <BsStopBtnFill size={20} />
      <p>긴급 정지</p>
    </MenuButtonUI>
  );
};

export default EmergencyStopBtn;

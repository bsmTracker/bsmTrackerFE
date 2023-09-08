import { StopIcon } from "@/Components/Icon/StopIcon";
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
      <StopIcon />
      <p>긴급 정지</p>
    </MenuButtonUI>
  );
};

export default EmergencyStopBtn;

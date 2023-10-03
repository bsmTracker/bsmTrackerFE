import { BsSpeakerFill } from "react-icons/bs";
import { MenuButtonUI } from "./UI";

const MornitoringBtn = () => {
  return (
    <MenuButtonUI
      onClick={() =>
        window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/player`)
      }
    >
      <BsSpeakerFill size={20} />
      <p>송출모니터링</p>
    </MenuButtonUI>
  );
};

export default MornitoringBtn;

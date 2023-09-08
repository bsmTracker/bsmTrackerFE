import { ListenIcon } from "@/Components/Icon/ListenIcon";
import { MenuButtonUI } from "./UI";

const MornitoringBtn = () => {
  return (
    <MenuButtonUI
      onClick={() =>
        window.open(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/player`)
      }
    >
      <ListenIcon />
      <p>송출모니터링</p>
    </MenuButtonUI>
  );
};

export default MornitoringBtn;

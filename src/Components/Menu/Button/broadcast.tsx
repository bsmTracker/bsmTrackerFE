import { MicIcon } from "@/Components/Icon/Mic";
import { MenuButtonGroupUI, MenuButtonUI } from "./UI";
import { useState } from "react";
import BroadcastModal from "./Modal/broadcast";

const BroadcastBtn = () => {
  const [open, setOpen] = useState(false);

  return (
    <MenuButtonUI>
      <MenuButtonGroupUI onClick={() => setOpen(!open)}>
        <MicIcon />
        <p>실시간 tts</p>
      </MenuButtonGroupUI>
      <BroadcastModal open={open} close={() => setOpen(false)} />
    </MenuButtonUI>
  );
};

export default BroadcastBtn;

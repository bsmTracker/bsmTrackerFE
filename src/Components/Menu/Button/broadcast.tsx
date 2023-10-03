import { BsChatDotsFill } from "react-icons/bs";
import { MenuButtonUI } from "./UI";
import { useState } from "react";
import BroadcastModal from "./Modal/broadcast";

const BroadcastBtn = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MenuButtonUI onClick={() => setOpen(!open)}>
        <BsChatDotsFill size={20} />
        <p>실시간 tts</p>
      </MenuButtonUI>
      <BroadcastModal open={open} close={() => setOpen(false)} />
    </>
  );
};

export default BroadcastBtn;

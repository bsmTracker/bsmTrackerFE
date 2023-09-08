import { ElectricityIcon } from "@/Components/Icon/Electricity";
import { MenuButtonUI, MenuSubInfoUI } from "./UI";
import { speakerSocket } from "@/socket/speaker";
import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

const RelayBtn = () => {
  const [relayStatus, setRelayStatus] = useState(false);

  useEffect(() => {
    speakerSocket.connect();
    speakerSocket.on("relay", (relayStatus) => {
      console.log(relayStatus);
      setRelayStatus(relayStatus);
    });
    return () => {
      speakerSocket.disconnect();
    };
  }, [speakerSocket]);

  return (
    <MenuButtonUI>
      <ElectricityIcon />
      <p>릴레이 {relayStatus ? "켜짐" : "꺼짐"}</p>
      <RelayColor status={relayStatus} />
    </MenuButtonUI>
  );
};

const RelayColor = tw.div`flex flex-col rounded-[100%] ${({
  status,
}: {
  status: boolean;
}) => (status ? "bg-green-300" : "bg-red-300")} w-[10px] h-[10px]`;

export default RelayBtn;

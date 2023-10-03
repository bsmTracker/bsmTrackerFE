import tw from "tailwind-styled-components";
import VolumeBtn from "./Button/volume";
import MornitoringBtn from "./Button/mornitoring";
import RelayBtn from "./Button/relay";
import EmergencyStopBtn from "./Button/EmergencyStop";
import BroadcastBtn from "./Button/broadcast";
import CalendarBtn from "./Button/Calendar";

const Menu = () => {
  return (
    <MenuWrapperUI>
      <EmergencyStopBtn />
      <BroadcastBtn />
      <CalendarBtn />
      <MornitoringBtn />
      <RelayBtn />
      <VolumeBtn />
    </MenuWrapperUI>
  );
};

export default Menu;

const MenuWrapperUI = tw.div`grid grid-cols-3 justify-items-center grid-flow-row md:grid-cols-6 px-[10px] py-[10px] gap-3 w-full bg-white border-black shadow-lg`;

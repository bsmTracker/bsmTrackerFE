import Image from "next/image";
import { IoMdSettings } from "react-icons/io";

export const SettingIcon = ({ onClick }: { onClick?: any }) => (
  <IoMdSettings className="cursor-pointer" size={30} onClick={onClick} />
);

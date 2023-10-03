import Image from "next/image";
import { BsPlayFill } from "react-icons/bs";

export const PlayIcon = ({ onClick }: { onClick?: any }) => {
  return <BsPlayFill className="cursor-pointer" size={30} onClick={onClick} />;
};

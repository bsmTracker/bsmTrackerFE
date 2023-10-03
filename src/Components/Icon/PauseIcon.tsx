import { BsPauseFill } from "react-icons/bs";

export const PauseIcon = ({ onClick }: { onClick?: any }) => (
  <BsPauseFill className="cursor-pointer" size={30} onClick={onClick} />
);

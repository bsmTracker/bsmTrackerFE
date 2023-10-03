import Image from "next/image";
import { CgAddR } from "react-icons/cg";

export const CreateIcon = ({ onClick }: { onClick?: any }) => (
  <CgAddR className="cursor-pointer" size={30} onClick={onClick} />
);

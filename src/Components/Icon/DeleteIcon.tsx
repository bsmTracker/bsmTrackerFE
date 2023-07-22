import Image from "next/image";

export const DeleteIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <Image
      alt="delete"
      src="http://localhost:8000/delete.svg"
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

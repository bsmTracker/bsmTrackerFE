import Image from "next/image";

export const DeleteIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <Image
      alt="delete"
      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/delete.svg`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

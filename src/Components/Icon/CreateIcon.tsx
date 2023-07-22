import Image from "next/image";

export const CreateIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <Image
      alt="add"
      src="http://localhost:8000/add.svg"
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

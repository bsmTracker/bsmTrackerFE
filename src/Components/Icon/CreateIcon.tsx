import Image from "next/image";

export const CreateIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <Image
      alt="add"
      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/add.svg`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

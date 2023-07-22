import Image from "next/image";

export const PlayIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <img
      alt="delete"
      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/play.png`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

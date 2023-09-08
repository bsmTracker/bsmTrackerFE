import Image from "next/image";

export const StopIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <img
      alt="stop"
      src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/stop.png`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

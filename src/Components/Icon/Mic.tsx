import Image from "next/image";

export const MicIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <img
      alt="mic"
      src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/mic.png`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

import Image from "next/image";

export const ListenIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <img
      alt="listen"
      src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/listen.png`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

import Image from "next/image";

export const ElectricityIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <img
      alt="electricity"
      src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/electricity.png`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

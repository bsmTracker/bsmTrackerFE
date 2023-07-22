import Image from "next/image";

export const SettingIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <Image
      alt="setting"
      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/settings.svg`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

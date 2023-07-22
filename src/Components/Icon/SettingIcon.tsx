import Image from "next/image";

export const SettingIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <Image
      alt="setting"
      src="http://localhost:8000/settings.svg"
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

import Image from "next/image";

export const PauseIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <img
      alt="delete"
      src="http://localhost:8000/pause.png"
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

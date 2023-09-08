import Image from "next/image";

export const CalendarIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <img
      alt="calendar"
      src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/calendar.png`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

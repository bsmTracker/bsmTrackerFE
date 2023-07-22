import Image from "next/image";

export const OrderIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <img
      alt="delete"
      src="http://localhost:8000/order.png"
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

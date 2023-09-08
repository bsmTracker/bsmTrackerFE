export const OrderIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <img
      alt="order"
      src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/order.png`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

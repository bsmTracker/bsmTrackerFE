export const OrderIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <img
      alt="delete"
      src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/order.png`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

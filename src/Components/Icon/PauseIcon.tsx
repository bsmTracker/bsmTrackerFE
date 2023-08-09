export const PauseIcon = ({ onClick }: { onClick?: any }) => {
  return (
    <img
      alt="delete"
      src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/pause.png`}
      className="cursor-pointer"
      width={30}
      height={30}
      onClick={onClick}
    />
  );
};

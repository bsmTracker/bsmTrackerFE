import tw from "tailwind-styled-components";

export const MenuWrapperUI = tw.div`grid grid-cols-3 justify-items-center grid-flow-row md:grid-cols-6 px-[10px] py-[10px] gap-3 w-full bg-gray-30 border-black border-b-[1px]`;
export const MenuButtonGroupUI = tw.div`flex flex-col`;
export const MenuButtonUI = tw.div`flex flex-col justify-center items-center cursor-pointer w-[100px] rounded-lg hover:bg-gray-100 p-1 relative`;
export const MenuSubInfoUI = tw.p`text-[10px]`;

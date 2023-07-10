// native
import { MouseEventHandler } from "react";
import Image from "next/image";

type Props = {
  title: string;
  type: "button" | "submit";
  leftIcon?: string;
  rightIcon?: string;
  isLoading?: boolean;
  bgColor?: string;
  textColor?: string;
  handleClick?: MouseEventHandler;
};

export default function CustomButton({
  title,
  type = "button",
  leftIcon,
  rightIcon,
  isLoading,
  bgColor,
  textColor,
  handleClick,
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`flexCenter gap-3 px-4 py-3 rounded-xl text-sm font-medium max-md:w-full 
      ${textColor || "text-white"}
      ${isLoading ? "bg-black/50" : bgColor || "bg-primary-purple"}
      `}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="rightIcon" />
      )}
    </button>
  );
}

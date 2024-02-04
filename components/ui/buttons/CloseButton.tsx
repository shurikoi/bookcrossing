import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import CrossIcon from "../icons/CrossIcon";


interface CloseButtonProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"]
  type?: "cross" | "arrow";
}

export default function CloseButton({ onClick, type = "cross" }: CloseButtonProps) {
  const CloseButton = {
    cross: {
      icon: <CrossIcon></CrossIcon>,
      style: "right-0 top-0 translate-x-[calc(100%+10px)] w-8 h-8",
    },
    arrow: {
      icon: <ArrowLeftIcon></ArrowLeftIcon>,
      style: "left-8 top-8 w-6 h-6 2md:top-14",
    },
  };

  return (
    <div className={`${CloseButton[type].style} absolute rounded-full cursor-pointer`} onClick={onClick}>
      {CloseButton[type].icon}
    </div>
  );
}

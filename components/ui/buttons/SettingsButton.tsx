interface SettingsButtonProps {
  children: React.ReactNode;
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export default function SettingsButton({ children, onClick }: SettingsButtonProps) {
  return (
    <div
      className="shadow-sm border w-fit p-2 px-4 font-extralight text-[14px] rounded-md cursor-pointer select-none"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

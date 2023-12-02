import ClosedEye from "../icons/ClosedEyeIcon";
import OpenedEye from "../icons/OpenedEyeIcon";

interface ShowPasswordBtn {
  isPasswordVisible: boolean;
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"]
}

export default function ShowPasswordBtn({ isPasswordVisible, onClick }: ShowPasswordBtn) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {isPasswordVisible ? <OpenedEye></OpenedEye> : <ClosedEye></ClosedEye>}
    </div>
  );
}

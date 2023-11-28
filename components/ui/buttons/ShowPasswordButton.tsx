import OpenedEye from "../icons/OpenedEyeIcon";
import ClosedEye from "../icons/ClosedEyeIcon";

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

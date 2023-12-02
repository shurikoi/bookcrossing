import { RefObject, useEffect } from "react";

export default function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    let mouseUpTarget: any, mouseDownTarget: any, isLeftButton: any;

    function checkClickOutside(e: MouseEvent) {
      mouseDownTarget = e.target as HTMLElement;
      isLeftButton = e.button == 0;

      document.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseUp(e: MouseEvent) {
      mouseUpTarget = e.target as HTMLElement;

      if (
        isLeftButton &&
        !ref.current?.contains(mouseUpTarget) &&
        !ref.current?.contains(mouseDownTarget) &&
        !mouseDownTarget.classList.contains("preventedClick")
      ) {
        callback();
        document.removeEventListener("mouseup", handleMouseUp);
      }
    }

    document.addEventListener("mousedown", checkClickOutside);

    return () => {
      document.removeEventListener("mousedown", checkClickOutside);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [callback, ref]);
}

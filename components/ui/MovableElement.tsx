import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";

interface childrenFunctionProps {
  nodeRef: React.RefObject<HTMLDivElement>;
  elementPosition: {
    left: number;
    top: number;
  };
  setElementPosition: Dispatch<
    SetStateAction<{
      left: number;
      top: number;
    }>
  >;
}

interface MovableElementProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children: (args: childrenFunctionProps) => React.ReactNode;
  width: number;
  height: number;
  left: number;
  top: number;
}

export default function MovableElement({ left, top, children, width, height, ...props }: MovableElementProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const elementStartPositionRef = useRef({
    left: 0,
    top: 0,
  });

  const [elementPosition, setElementPosition] = useState({ top, left });

  function handleZoneMoveStart(e: MouseEvent) {
    if (nodeRef?.current) nodeRef.current.style.cursor = "grabbing";

    elementStartPositionRef.current = {
      left: e.clientX - nodeRef.current!.offsetLeft,
      top: e.clientY - nodeRef.current!.offsetTop,
    };

    document.addEventListener("mousemove", handleZoneMove, { passive: true });
    document.addEventListener("mouseup", handleZoneMoveEnd, { passive: true });
  }

  function handleZoneMove(e: MouseEvent) {
    if (elementStartPositionRef.current.left == 0 && elementStartPositionRef.current.left == 0) return;

    setElementPosition(
      calculatePosition(
        e.clientX - elementStartPositionRef.current.left,
        e.clientY - elementStartPositionRef.current.top
      )
    );
  }

  function handleZoneMoveEnd(e: MouseEvent) {
    if (nodeRef?.current) nodeRef.current.style.removeProperty("cursor");

    document.removeEventListener("mousemove", handleZoneMove);
    document.removeEventListener("mouseup", handleZoneMoveEnd);
  }

  function calculatePosition(left: number, top: number) {
    const parent = nodeRef.current?.parentElement!;

    return {
      left:
        left + nodeRef.current!.offsetWidth > parent.offsetWidth
          ? parent.offsetWidth - nodeRef.current!.offsetWidth
          : left < 0
          ? 0
          : left,
      top:
        top + nodeRef.current!.offsetHeight > parent.offsetHeight
          ? parent.offsetHeight - nodeRef.current!.offsetHeight
          : top < 0
          ? 0
          : top,
    };
  }

  useEffect(() => {
    if (!nodeRef.current) return;

    nodeRef.current.addEventListener("mousedown", handleZoneMoveStart, { passive: true });

    return () => {
      nodeRef.current?.removeEventListener("mousedown", handleZoneMoveStart);
      document.removeEventListener("mousemove", handleZoneMove);
      document.removeEventListener("mouseup", handleZoneMoveEnd);
    };
  }, []);

  return (
    <div
      className={`absolute ${props.className}`}
      style={{ width, height, left: elementPosition.left, top: elementPosition.top }}
      ref={nodeRef}
    >
      {children({ nodeRef, elementPosition, setElementPosition })}
    </div>
  );
}

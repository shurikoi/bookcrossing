import { Dispatch, HTMLAttributes, RefObject, SetStateAction, useEffect, useRef, useState } from "react";

interface ResizableSquareElementProps extends HTMLAttributes<HTMLDivElement> {
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  position: { left: number; top: number };
  setPosition: Dispatch<SetStateAction<{ left: number; top: number }>>;
  nodeRef : RefObject<HTMLDivElement>
  maxWidth: number;
  maxHeight: number;
}

const MIN_SIZE = 32;

export default function ResizableSquareElement({
  size,
  setSize,
  children,
  position,
  setPosition,
  maxWidth,
  nodeRef,
  maxHeight,
  ...props
}: ResizableSquareElementProps) {
  const [resizeStartPosition, setResizeStartPosition] = useState({
    left: 0,
    top: 0,
  });

  const activeCornerRef = useRef<HTMLDivElement | null>(null);

  const tlRef = useRef<HTMLDivElement>(null);
  const trRef = useRef<HTMLDivElement>(null);
  const blRef = useRef<HTMLDivElement>(null);
  const brRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tlRef.current?.addEventListener("mousedown", handleResizeStart);
    trRef.current?.addEventListener("mousedown", handleResizeStart);
    blRef.current?.addEventListener("mousedown", handleResizeStart);
    brRef.current?.addEventListener("mousedown", handleResizeStart);

    return () => {
      tlRef.current?.removeEventListener("mousedown", handleResizeStart);
      trRef.current?.removeEventListener("mousedown", handleResizeStart);
      blRef.current?.removeEventListener("mousedown", handleResizeStart);
      brRef.current?.removeEventListener("mousedown", handleResizeStart);
    };
  }, [tlRef, trRef, blRef, brRef, size]);

  useEffect(() => {
    if (activeCornerRef.current) {
      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", handleResizeEnd);
      return () => {
        document.removeEventListener("mousemove", handleResize);
        document.removeEventListener("mouseup", handleResizeEnd);
      };
    }
  }, [resizeStartPosition, activeCornerRef.current]);

  function handleResizeStart(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    activeCornerRef.current = e.target as HTMLDivElement;

    setResizeStartPosition({
      left: e.clientX,
      top: e.clientY,
    });
  }

  function handleResize(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    let calculatedSize;

    switch (activeCornerRef.current?.dataset.side) {
      case "br":
        setSize(calculateSize(size + e.clientX - resizeStartPosition.left));

        break;
      case "bl":
        calculatedSize = calculateSize(size - (e.clientX - resizeStartPosition.left));

        setSize(calculatedSize);

        if (calculatedSize > MIN_SIZE && calculatedSize < maxWidth && calculatedSize < maxHeight) {
          setPosition(() => {
            return {
              left: position.left + (e.clientX - resizeStartPosition.left),
              top: position.top,
            };
          });
        }
        break;
      case "tr":
        calculatedSize = calculateSize(size - (e.clientY - resizeStartPosition.top));

        setSize(calculatedSize);

        if (calculatedSize > MIN_SIZE && calculatedSize < maxWidth && calculatedSize < maxHeight) {
          setPosition(() => {
            return {
              left: position.left,
              top: position.top + (e.clientY - resizeStartPosition.top),
            };
          });
        }
        break;
      case "tl":
        calculatedSize = calculateSize(size - (e.clientX - resizeStartPosition.left));

        setSize(calculatedSize);

        if (calculatedSize > MIN_SIZE && calculatedSize < maxWidth && calculatedSize < maxHeight) {
          setPosition(() => {
            return {
              left: position.left + (e.clientX - resizeStartPosition.left),
              top: position.top + (e.clientX - resizeStartPosition.left),
            };
          });
        }
        break;
    }
  }

  function handleResizeEnd() {
    document.removeEventListener("mousemove", handleResize);
  }

  function calculateSize(size: number) {
    if (size > maxWidth) return maxWidth;
    if (size > maxHeight) return maxHeight;

    if (size < MIN_SIZE) return MIN_SIZE;

    return size;
  }

  return (
    <div {...props} ref={nodeRef}>
      {children}

      <div
        className="absolute bg-white/70 w-3 cursor-nw-resize aspect-square rounded-sm -top-2 -left-2 shadow-md"
        data-side="tl"
        ref={tlRef}
      ></div>
      <div
        className="absolute bg-white/70 w-3 cursor-ne-resize aspect-square rounded-sm -top-2 -right-2 shadow-md"
        data-side="tr"
        ref={trRef}
      ></div>
      <div
        className="absolute bg-white/70 w-3 cursor-ne-resize aspect-square rounded-sm -bottom-2 -left-2 shadow-md"
        data-side="bl"
        ref={blRef}
      ></div>
      <div
        className="absolute bg-white/70 w-3 cursor-nw-resize aspect-square rounded-sm -bottom-2 -right-2 shadow-md"
        data-side="br"
        ref={brRef}
      ></div>
    </div>
  );
}

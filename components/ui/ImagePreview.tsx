import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "./buttons/Button";
import cutImage from "@/lib/cutImage";
import { image } from "../authorized/publication_menu/PublicationMenu";
import ModalMenu from "./ModalMenu";

interface ImagePreviewProps {
  image: string;
  setImage: Dispatch<SetStateAction<image>>;
  handleCancel?: () => void;
  handleSubmit?: () => void;
  isMenuActive: boolean;
  setIsMenuActive: Dispatch<SetStateAction<boolean>>;
}

export default function ImagePreview({
  image,
  setImage,
  handleCancel,
  handleSubmit,
  isMenuActive,
  setIsMenuActive,
}: ImagePreviewProps) {
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);

  const [size, setSize] = useState(0);

  const tlRef = useRef<HTMLDivElement>(null);
  const trRef = useRef<HTMLDivElement>(null);
  const blRef = useRef<HTMLDivElement>(null);
  const brRef = useRef<HTMLDivElement>(null);

  const activeCornerRef = useRef<HTMLDivElement | null>(null);

  const [resizeStartPosition, setResizeStartPosition] = useState({
    left: 0,
    top: 0,
  });

  const [visibleZoneStartPosition, setVisibleZoneStartPosition] = useState({
    left: 0,
    top: 0,
  });

  const [visibleZonePosition, setVisibleZonePosition] = useState({
    left: 0,
    top: 0,
  });

  const visibleZoneRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      setVisibleZonePosition({
        left: 0,
        top: 0,
      });
    }
  }, [image, previewRef.current]);

  useEffect(() => {
    if (!visibleZoneRef.current) return;

    visibleZoneRef.current.addEventListener("mousedown", handleZoneMoveStart, { passive: true });

    return () => {
      visibleZoneRef.current?.removeEventListener("mousedown", handleZoneMoveStart);
    };
  }, [visibleZoneRef.current]);

  useEffect(() => {
    document.addEventListener("mousemove", handleZoneMove, { passive: true });
    document.addEventListener("mouseup", handleZoneMoveEnd, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleZoneMove);
      document.removeEventListener("mouseup", handleZoneMoveEnd);
    };
  }, [visibleZoneStartPosition]);

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

  useLayoutEffect(() => {
    if (visibleZonePosition.left < 0 || visibleZonePosition.left + size > maxWidth) {
      setVisibleZonePosition((visibleZonePosition) => {
        const { left, top } = calculatePosition(visibleZonePosition.left, visibleZonePosition.top);
        return {
          left,
          top,
        };
      });
    }
  }, [visibleZonePosition, size]);

  function handleZoneMoveStart(e: MouseEvent) {
    setVisibleZoneStartPosition({
      left: e.clientX - visibleZoneRef.current!.offsetLeft,
      top: e.clientY - visibleZoneRef.current!.offsetTop,
    });
  }

  function handleZoneMove(e: MouseEvent) {
    if (visibleZoneStartPosition.left == 0 && visibleZoneStartPosition.left == 0) return;

    setVisibleZonePosition(
      calculatePosition(e.clientX - visibleZoneStartPosition.left, e.clientY - visibleZoneStartPosition.top)
    );
  }

  function handleZoneMoveEnd(e: MouseEvent) {
    document.removeEventListener("mousemove", handleZoneMove);
    document.removeEventListener("mouseup", handleZoneMoveEnd);
  }

  function calculatePosition(left: number, top: number) {
    return {
      left:
        left + visibleZoneRef.current!.offsetWidth > maxWidth
          ? maxWidth - visibleZoneRef.current!.offsetWidth
          : left < 0
          ? 0
          : left,
      top:
        top + visibleZoneRef.current!.offsetHeight > maxHeight
          ? maxHeight - visibleZoneRef.current!.offsetHeight
          : top < 0
          ? 0
          : top,
    };
  }

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

    if (!visibleZoneRef.current) return;

    let calculatedSize;

    switch (activeCornerRef.current?.dataset.side) {
      case "br":
        setSize(calculateSize(size + e.clientX - resizeStartPosition.left));

        break;
      case "bl":
        calculatedSize = calculateSize(size - (e.clientX - resizeStartPosition.left));

        setSize(calculatedSize);

        if (calculatedSize > 96 && calculatedSize < maxWidth && calculatedSize < maxHeight) {
          setVisibleZonePosition(() => {
            return {
              left: visibleZonePosition.left + (e.clientX - resizeStartPosition.left),
              top: visibleZonePosition.top,
            };
          });
        }
        break;
      case "tr":
        calculatedSize = calculateSize(size - (e.clientY - resizeStartPosition.top));

        setSize(calculatedSize);

        if (calculatedSize > 96 && calculatedSize < maxWidth && calculatedSize < maxHeight) {
          setVisibleZonePosition(() => {
            return {
              left: visibleZonePosition.left,
              top: visibleZonePosition.top + (e.clientY - resizeStartPosition.top),
            };
          });
        }
        break;
      case "tl":
        calculatedSize = calculateSize(size - (e.clientX - resizeStartPosition.left));

        setSize(calculatedSize);

        if (calculatedSize > 96 && calculatedSize < maxWidth && calculatedSize < maxHeight) {
          setVisibleZonePosition(() => {
            return {
              left: visibleZonePosition.left + (e.clientX - resizeStartPosition.left),
              top: visibleZonePosition.top + (e.clientX - resizeStartPosition.left),
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

    if (size < 96) return 96;

    return size;
  }

  function handleClick() {
    cutImage({
      image,
      startX: visibleZonePosition.left,
      startY: visibleZonePosition.top,
      endX: visibleZonePosition.left + size,
      endY: visibleZonePosition.top + size,
      callback: ({ url, data }) => setImage({ url, data }),
    });

    handleClose();
  }

  function handleClose() {
    setIsMenuActive(false);
  }

  return (
    <ModalMenu fullMode isModalActive={isMenuActive} setIsModalActive={setIsMenuActive}>
      <div className="bg-white">
        <div className="absolute -left-full top-0 text-2xl">{JSON.stringify(visibleZonePosition)}</div>
        <div className="w-fit relative" ref={previewRef}>
          <div className="absolute w-full h-full bg-black/50"></div>

          <div
            className="w-full aspect-square absolute select-none"
            ref={visibleZoneRef}
            draggable={false}
            style={{
              maxWidth: maxWidth,
              maxHeight: maxWidth,
              left: visibleZonePosition.left,
              top: visibleZonePosition.top,
              width: size,
              height: size,
            }}
          >
            <div className="overflow-hidden w-full h-full rounded-full absolute bg-white/10" draggable={false}>
              <img
                src={image}
                alt=""
                className="object-cover max-w-none max-h-none absolute"
                draggable={false}
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;

                  setMaxWidth(target.width);
                  setMaxHeight(target.height);
                  setSize(target.width < target.height ? target.width : target.height);
                }}
                style={{ left: -visibleZonePosition.left, top: -visibleZonePosition.top }}
              />
            </div>

            <div
              className="absolute bg-white/70 w-4 cursor-nw-resize aspect-square rounded-sm top-0 left-0"
              data-side="tl"
              ref={tlRef}
            ></div>
            <div
              className="absolute bg-white/70 w-4 cursor-ne-resize aspect-square rounded-sm top-0 right-0"
              data-side="tr"
              ref={trRef}
            ></div>
            <div
              className="absolute bg-white/70 w-4 cursor-ne-resize aspect-square rounded-sm bottom-0 left-0"
              data-side="bl"
              ref={blRef}
            ></div>
            <div
              className="absolute bg-white/70 w-4 cursor-nw-resize aspect-square rounded-sm bottom-0 right-0"
              data-side="br"
              ref={brRef}
            ></div>
          </div>
          <img src={image} alt="" className="max-h-none max-w-none" draggable={false} />
        </div>
        <div className="flex gap-2 p-4 justify-center">
          <Button onClick={handleClick}>Potwierdź</Button>
          <Button onClick={handleCancel} className="bg-red-500">
            Anuluj
          </Button>
        </div>
      </div>{" "}
    </ModalMenu>
  );
}

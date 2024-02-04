import { Dispatch, SetStateAction, useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import Button from "../../ui/buttons/Button";
import cutImage from "@/lib/cutImage";
import { image } from "../publication_menu/PublicationMenu";
import ModalMenu from "../../ui/ModalMenu";
import ResizableSquareElement from "../../ui/ResizableSquareElement";
import { useScreen } from "../../contexts/ScreenProvider";

interface MobileImagePreviewProps {
  image: image;
  setImage: Dispatch<SetStateAction<image>>;
  handleCancel?: () => void;
  handleSubmit?: () => void;
  isMenuActive: boolean;
  setIsMenuActive: Dispatch<SetStateAction<boolean>>;
}

export default function MobileImagePreview({
  image,
  setImage,
  isMenuActive,
  setIsMenuActive,
}: MobileImagePreviewProps) {
  const [scale, setScale] = useState(1);
  const [isPinching, setIsPinching] = useState(false);

  const imageSizeScaleRef = useRef(0);
  const visibleZoneSizeRef = useRef(0);
  const prevDistanceBetweenTouchesRef = useRef(0);

  const startPositionRef = useRef<{ left: number; top: number }[] | null>(null);

  const visibleZoneRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [visibleZonePosition, setVisibleZonePosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    visibleZoneRef.current?.addEventListener("touchstart", handleTouchStart);

    return () => {
      visibleZoneRef.current?.removeEventListener("touchstart", handleTouchStart);
    };
  }, [visibleZonePosition, scale]);

  useLayoutEffect(() => {
    visibleZoneSizeRef.current = window.innerWidth / scale / imageSizeScaleRef.current;

    setVisibleZonePosition(({ left, top }) => calculateRightPosition({ left, top }));
  }, [scale]);

  useEffect(() => {
    setVisibleZonePosition({
      left: 0,
      top: 0,
    });

    setScale(1);
  }, [image]);

  function handleTouchStart(e: TouchEvent) {
    setIsPinching(true);

    if (e.touches.length == 1) {
      startPositionRef.current = [
        {
          left: e.touches[0].clientX,
          top: e.touches[0].clientY,
        },
      ];

      visibleZoneRef.current?.addEventListener("touchmove", moveVisibleZone);
    } else if (e.touches.length >= 2) {
      prevDistanceBetweenTouchesRef.current = calculateDistanceBetweenTouches(
        e.touches[0].clientX,
        e.touches[1].clientX,
        e.touches[0].clientY,
        e.touches[1].clientY
      );

      startPositionRef.current = [
        {
          left: e.touches[0].clientX,
          top: e.touches[0].clientY,
        },
        {
          left: e.touches[1].clientX,
          top: e.touches[1].clientY,
        },
      ];

      visibleZoneRef.current?.addEventListener("touchmove", resizeVisibleZone);
      visibleZoneRef.current?.removeEventListener("touchmove", moveVisibleZone);
    }

    function handleTouchEnd(e: TouchEvent) {
      setIsPinching(false);

      visibleZoneRef.current?.removeEventListener("touchmove", moveVisibleZone);
      visibleZoneRef.current?.removeEventListener("touchmove", resizeVisibleZone);
    }

    document.addEventListener("touchend", handleTouchEnd);
  }

  const moveVisibleZone = useCallback(
    (e: TouchEvent) => {
      if (!startPositionRef.current) return;

      const left =
        visibleZonePosition.left + (e.touches[0].clientX / scale) * 2 - (startPositionRef.current[0].left / scale) * 2;
      const top =
        visibleZonePosition.top + (e.touches[0].clientY / scale) * 2 - (startPositionRef.current[0].top / scale) * 2;

      setVisibleZonePosition(calculateRightPosition({ left, top }));
    },
    [visibleZonePosition, scale]
  );

  const resizeVisibleZone = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length != 2) return;

      const distanceBetweenTouches = calculateDistanceBetweenTouches(
        e.touches[0].clientX,
        e.touches[1].clientX,
        e.touches[0].clientY,
        e.touches[1].clientY
      );

      if (!prevDistanceBetweenTouchesRef.current) prevDistanceBetweenTouchesRef.current = distanceBetweenTouches;

      let newScale = scale + (distanceBetweenTouches - prevDistanceBetweenTouchesRef.current) * 0.05;

      if (newScale < 1) newScale = 1;
      else if (newScale > 5) newScale = 5;

      setScale(newScale);
    },
    [scale]
  );

  function calculateDistanceBetweenTouches(x1: number, x2: number, y1: number, y2: number) {
    const xDistance = Math.max(x1, x2) - Math.min(x1, x2);
    const yDistance = Math.max(y1, y2) - Math.min(y1, y2);

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }

  function calculateRightPosition({ left, top }: { left: number; top: number }) {
    if (!imageRef.current) return { left, top };

    const clientWidth = imageRef.current.clientWidth;
    const clientHeight = imageRef.current.clientHeight;

    const naturalWidth = imageRef.current.naturalWidth;
    const naturalHeight = imageRef.current.naturalHeight;

    imageSizeScaleRef.current =
      naturalHeight > naturalWidth ? clientWidth / naturalWidth : clientHeight / naturalHeight;

    const scaledWidth = clientWidth / scale;
    const scaledHeight = clientHeight / scale;

    if (left > 0) left = 0;
    else if (left < -naturalWidth * imageSizeScaleRef.current + scaledWidth)
      left = -naturalWidth * imageSizeScaleRef.current + scaledWidth;

    if (top > 0) top = 0;
    if (top < -naturalHeight * imageSizeScaleRef.current + scaledHeight)
      top = -naturalHeight * imageSizeScaleRef.current + scaledHeight;

    return { left, top };
  }

  function handleClick() {
    if (!image?.data || !imageRef.current) return;

    const startX = Math.abs(visibleZonePosition.left) / imageSizeScaleRef.current;
    const startY = Math.abs(visibleZonePosition.top) / imageSizeScaleRef.current;

    cutImage({
      image: image.data,
      startX,
      startY,
      endX: startX + visibleZoneSizeRef.current,
      endY: startY + visibleZoneSizeRef.current,
      callback: ({ url, data }) => setImage({ url, data }),
    });

    handleClose();
  }

  function handleClose() {
    setIsMenuActive(false);
  }
  const anchorRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <ModalMenu disabled={isPinching} fullMode isModalActive={isMenuActive} setIsModalActive={setIsMenuActive}>
      <div className="relative" ref={visibleZoneRef}>
        <div className="absolute bg-black/60 w-full h-full z-10"></div>
        <div className="absolute w-full aspect-square overflow-hidden rounded-full z-10">
          <img
            ref={imageRef}
            src={image?.url || ""}
            className="h-full w-full object-cover pointer-events-none"
            style={{
              objectPosition: `${visibleZonePosition.left}px ${visibleZonePosition.top}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            alt=""
          />
        </div>
        <div className="w-full overflow-hidden aspect-square">
          <img
            src={image?.url || ""}
            alt=""
            className="h-full w-full object-cover pointer-events-none"
            draggable={false}
            style={{
              objectPosition: `${visibleZonePosition.left}px ${visibleZonePosition.top}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          />
        </div>
      </div>
      <div className="flex gap-2 p-4 justify-center bg-white">
        <Button onClick={handleClick}>Potwierdź</Button>
        <Button onClick={handleClose} className="bg-red-500">
          Anuluj
        </Button>{" "}
      </div>
    </ModalMenu>
  );
}

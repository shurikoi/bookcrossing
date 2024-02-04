import { Dispatch, SetStateAction, SyntheticEvent, useEffect,  useRef, useState } from "react";
import Button from "../../ui/buttons/Button";
import cutImage from "@/lib/cutImage";
import { image } from "../publication_menu/PublicationMenu";
import ModalMenu from "../../ui/ModalMenu";
import ResizableSquareElement from "../../ui/ResizableSquareElement";
import MovableElement from "@/components/ui/MovableElement";

interface ImagePreviewProps {
  image: image;
  setImage: Dispatch<SetStateAction<image>>;
  isMenuActive: boolean;
  setIsMenuActive: Dispatch<SetStateAction<boolean>>;
}

export default function ImagePreview({ image, setImage, isMenuActive, setIsMenuActive }: ImagePreviewProps) {
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);

  const [size, setSize] = useState(0);

  const positionRef = useRef<{ top: number; left: number }>({
    left: 0,
    top: 0,
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(0);

  function handleClick() {
    if (!image?.data) return;

    cutImage({
      image: image.data,
      startX: positionRef.current.left / scaleRef.current,
      startY: positionRef.current.top / scaleRef.current,
      endX: positionRef.current.left / scaleRef.current + size / scaleRef.current,
      endY: positionRef.current.top / scaleRef.current + size / scaleRef.current,
      callback: ({ url, data }) => setImage({ url, data }),
    });

    handleClose();
  }

  function handleClose() {
    setIsMenuActive(false);
  }

  function handleImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    const target = e.target as HTMLImageElement;

    let scale = (scaleRef.current = 384 / target.naturalWidth);

    if (target.naturalHeight * scale < 120) scale = scaleRef.current = target.naturalHeight / 120;
    else if (target.naturalWidth * scale < 120) scale = scaleRef.current = target.naturalWidth / 120;

    if (target.naturalHeight * scale > 700) scale = scaleRef.current = 700 / target.naturalHeight;

    setMaxWidth(target.naturalWidth * scale);
    setMaxHeight(target.naturalHeight * scale);

    setSize(target.naturalWidth < target.naturalHeight ? target.naturalWidth * scale : target.naturalHeight * scale);
  }

  return (
    <ModalMenu fullMode isModalActive={isMenuActive} setIsModalActive={setIsMenuActive}>
      <div className="bg-black/50">
        <div className="flex justify-center relative select-none" ref={previewRef}>
          <div className="relative" style={{ width: maxWidth, height: maxHeight }}>
            <div className="absolute w-full h-full bg-black/50"></div>
            <MovableElement
              className="aspect-square absolute select-none cursor-grab"
              width={size}
              height={size}
              left={0}
              top={0}
            >
              {({ nodeRef, elementPosition, setElementPosition }) => {
                positionRef.current = {
                  left: elementPosition.left,
                  top: elementPosition.top,
                };

                return (
                  <ResizableSquareElement
                    nodeRef={nodeRef}
                    maxHeight={maxHeight}
                    maxWidth={maxWidth}
                    position={elementPosition}
                    setPosition={setElementPosition}
                    setSize={setSize}
                    size={size}
                    draggable={false}
                    style={{
                      maxWidth: maxWidth,
                      maxHeight: maxWidth,
                      left: elementPosition.left,
                      top: elementPosition.top,
                      width: size,
                      height: size,
                    }}
                  >
                    <div className="overflow-hidden w-full h-full rounded-full absolute" draggable={false}>
                      <img
                        src={image?.url || ""}
                        alt=""
                        className="object-cover max-w-none max-h-none"
                        draggable={false}
                        onLoad={handleImageLoad}
                        style={{
                          objectPosition: `${-elementPosition.left}px ${-elementPosition.top}px`,
                          maxHeight,
                          maxWidth,
                        }}
                      />
                    </div>
                  </ResizableSquareElement>
                );
              }}
            </MovableElement>
            <img
              src={image?.url || ""}
              alt=""
              className="w-full object-cover max-h-none max-w-none"
              draggable={false}
              style={{ maxWidth, maxHeight }}
            />
          </div>
        </div>
        <div className="flex gap-2 p-4 justify-center bg-white">
          <Button onClick={handleClick}>Potwierdź</Button>
          <Button onClick={handleClose} className="bg-red-500">
            Anuluj
          </Button>
        </div>
      </div>
    </ModalMenu>
  );
}

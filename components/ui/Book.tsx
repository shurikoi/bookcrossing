import dateConjugation from "@/lib/dateConjugation";
import Image from "next/image";
import { memo, useLayoutEffect, useState } from "react";
import { publication } from "../authorized/Main";

interface BookProps {
  data: publication;
  handleClick?: () => void;
}

const Book = memo(({ data, handleClick }: BookProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useLayoutEffect(() => {
    setIsImageLoaded(true);
  }, [data]);

  return (
    <div className="relative" key={data.id}>
      <div
        className={`rounded-md overflow-hidden relative w-60 aspect-[3/4] ${
          isImageLoaded ? "transparent" : "bg-black"
        } font-inter shadow-[0px_0px_15px_1px_rgba(0,0,0,.5)] hover:scale-[1.04] hover:shadow-[0px_0px_30px_1px_rgba(0,0,0,.5)] cursor-pointer duration-200 will-change-transform flex-shrink-0 ${
          data.isReserved ? "border-[7px] border-purple-400" : ""
        }`}
        onClick={handleClick}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        {isImageLoaded ? (
          <Image
            src={data.image}
            alt=""
            fill
            priority
            quality={100}
            className={`object-cover`}
            onError={(e) => {
              setIsImageLoaded(false);
            }}
          />
        ) : (
          <div className="absolute text-white w-full h-full flex items-center justify-center bg-black">
            Nie ma zdjęcia
          </div>
        )}

        <div
          className={`relative flex flex-col justify-between h-full p-5 duration-200 z-0 ${
            isMouseOver ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
          }`}
        >
          <div
            className={`bg-black/40 duration-200 absolute w-full h-full left-0 top-0 text-white flex items-center justify-center -z-[1]`}
          ></div>
          <div className="text-[#CDCDCD] text-[17px] font-normal cursor-text w-fit">{dateConjugation(data.date)}</div>
          <div>
            <div
              className="font-medium text-[21px] text-white overflow-hidden text-ellipsis cursor-text w-fit max-w-full whitespace-nowrap "
              title={data.title}
            >
              {data.title}
            </div>
            <div
              className="text-[#CDCDCD] text-[18px] font-normal overflow-hidden text-ellipsis cursor-text w-fit max-w-full min-h-[1.5em] "
              title={data.author}
            >
              {data.author}
            </div>
          </div>
        </div>
      </div>
      <Image
        title={data.ownerData.name + " " + data.ownerData.surname}
        src={data.ownerData.avatar}
        width={56}
        height={56}
        quality={100}
        alt=""
        className={`absolute top-0 right-0 -translate-y-1/2 w-14 h-14 translate-x-1/2 rounded-full skeleton duration-300 ${
          isMouseOver ? "opacity-0" : "opacity-100"
        }`}
      ></Image>
    </div>
  );
});

Book.displayName = "Book";

export default Book;

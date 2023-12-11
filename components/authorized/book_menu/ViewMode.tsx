import { useBook } from "@/components/contexts/BookProvider";
import { useScreen } from "@/components/contexts/ScreenProvider";
import { useUserData } from "@/components/contexts/UserProvider";
import PublicationField from "@/components/ui/PublicationField";
import LanguageIcon from "@/components/ui/icons/LanguageIcon";
import LeafIcon from "@/components/ui/icons/LeafIcon";
import NotFoundIcon from "@/components/ui/icons/NotFoundIcon";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import TagIcon from "@/components/ui/icons/TagIcon";
import BookMenuLoader from "@/components/ui/loaders/skeleton/BookMenuLoader";
import Image from "next/image";
import { Dispatch, ReactNode, SetStateAction, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { BookMenuMode } from "./BookMenu";
import Buttons from "./Buttons";
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";
import ReservationInfo from "./ReservationInfo";
import { Palette, useColor, usePalette } from "color-thief-react";

interface ViewModeProps {
  isModalActive: boolean;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  setMode: Dispatch<SetStateAction<BookMenuMode>>;
}

export default function ViewMode({ isModalActive, setIsModalActive, setMode }: ViewModeProps) {
  const { user } = useUserData();

  const { book, isLoading } = useBook();

  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const colorRef = useRef<HTMLImageElement>(null);

  const { isSmallScreen } = useScreen();

  useLayoutEffect(() => {
    setIsImageLoaded(true);
  }, [book]);

  const UserInfo = useMemo(() => {
    return (
      !isSmallScreen &&
      book &&
      book.owner != user?.id && (
        <Palette src={book.image} format="hslArray" quality={50}>
          {({ data }) => (
            <div
              className="absolute -top-6 -right-6 px-12 py-6 rounded-bl-[100%] bg-transparent rounded-tr-[7px] duration-200"
              style={
                data && {
                  backgroundColor: `hsl(${(data[0][0] + " " + data[0][1] + "% " + data[0][2] + "%")})`,
                }
              }
            >
              <div className="flex flex-col items-center translate-x-6 -translate-y-2 gap-1">
                {console.log(data, data && data[0]) as ReactNode}
                <Image
                  quality={100}
                  height={64}
                  width={64}
                  alt=""
                  title={book.ownerData.name + " " + book.ownerData.surname}
                  src={book?.ownerData.avatar}
                  className={`w-16 h-16 rounded-full cursor-pointer`}
                  ref={colorRef}
                ></Image>
                <div
                  className="text-transparent duration-200"
                  style={
                    data && {
                      color: `hsl(${(Number(data[0][0] +  20) + " " + Number(data[0][1] +  40) + "% " + data[0][2] + "%")})`,
                    }
                  }
                >
                  {book.ownerData.name}
                </div>
              </div>
            </div>
          )}
        </Palette>
      )
    );
  }, [book, isSmallScreen]);

  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <TransitionGroup exit={false} mode="out-in" component={null}>
        <CSSTransition
          key={isLoading ? "loading" : "view"}
          classNames="fade"
          addEndListener={(done: any) => {
            if (nodeRef.current) {
              nodeRef.current.addEventListener("transitionend", done, false);
            }
          }}
          nodeRef={nodeRef}
        >
          <div
            className="flex flex-col w-full lg:min-w-[900px] min-h-[400px] gap-4 pb-6 lg:p-6 h-fit"
            key={book?.id}
            ref={nodeRef}
          >
            {isLoading ? (
              <BookMenuLoader></BookMenuLoader>
            ) : book ? (
              <>
                {!isSmallScreen && book.reservatorData && book?.owner == user?.id && (
                  <ReservationInfo
                    name={book.reservatorData.name}
                    surname={book.reservatorData.surname}
                  ></ReservationInfo>
                )}
                <div className="relative flex flex-col lg:flex-row gap-6">
                  {UserInfo}
                  <div className="flex flex-col lg:gap-6 shrink-0 lg:w-[220px]">
                    <div className="relative shrink-0">
                      <div className="w-full aspect-[3/4]">
                        {isImageLoaded ? (
                          <>
                            <Image
                              quality={100}
                              fill
                              src={book.image}
                              alt=""
                              priority
                              className={`object-cover`}
                              onError={(e) => {
                                setIsImageLoaded(false);
                              }}
                            />
                          </>
                        ) : (
                          !isImageLoaded && (
                            <div className="bg-black text-white flex items-center h-full justify-center">
                              Nie ma zdjęcia
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    {!isSmallScreen ? (
                      <Buttons setMode={setMode}></Buttons>
                    ) : (
                      book.reservatorData &&
                      book?.owner == user?.id && (
                        <ReservationInfo
                          name={book.reservatorData.name}
                          surname={book.reservatorData.surname}
                        ></ReservationInfo>
                      )
                    )}
                  </div>
                  <div className="flex flex-col gap-8 items-center text-center lg:items-start lg:text-left px-6 lg:p-0">
                    <div className="font-head font-normal text-[20px]">{book.title}</div>
                    <div className="w-full grid grid-cols-[repeat(2,1fr)] grid-rows-2 font-extralight leading-none text-[14px] gap-y-6 gap-x-10 lg:gap-x-10 lg:pr-10">
                      <PublicationField
                        data={book.author}
                        icon={<ProfileIcon />}
                        title="Autor"
                        bg="bg-[#a4e94d7a]"
                      ></PublicationField>

                      <PublicationField
                        data={book.state}
                        icon={<LeafIcon />}
                        title="Stan"
                        bg="bg-[#4d66e97a]"
                      ></PublicationField>

                      <PublicationField
                        data={book.category}
                        icon={<TagIcon />}
                        title="Kategoria"
                        bg="bg-[#e9d04d7a]"
                      ></PublicationField>

                      <PublicationField
                        data={book.language}
                        icon={<LanguageIcon />}
                        title="Język"
                        bg="bg-[#e97c4d7a]"
                      ></PublicationField>
                    </div>
                    <div
                      className="text-[#474747] font-light font-inter text-[15px] lg:w-[500px] max-h-[180px] overflow-y-auto break-all
                                "
                    >
                      {book.description}
                    </div>
                    {isSmallScreen && (
                      <div className="flex flex-col gap-2.5 w-full">
                        <div className="flex gap-2.5 w-full py-3 justify-center border border-dashed border-spacing-4 border-[#9CABFF]">
                          <Image
                            quality={100}
                            height={64}
                            width={64}
                            alt=""
                            title={book.ownerData.name + " " + book.ownerData.surname}
                            src={book?.ownerData.avatar}
                            className={`w-14 h-14 rounded-full cursor-pointer duration-200`}
                          ></Image>
                          <div className="flex flex-col justify-center text-left font-head">
                            <div className="text-[#9CABFF] font-extralight text-xs">Właściciel</div>
                            <div className="text-[#18559F] font-light text-base">{book.ownerData.name}</div>
                          </div>
                        </div>

                        <Buttons setMode={setMode}></Buttons>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center lg:justify-start flex-1 lg:h-auto w-full gap-6">
                <div className="text-2xl">Takiej książki nie ma</div>
                <div className="w-3/4">
                  <NotFoundIcon></NotFoundIcon>
                </div>
              </div>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

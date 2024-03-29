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
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ReservationInfo from "./ReservationInfo";

interface ViewModeProps {
  isModalActive: boolean;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  setMode: Dispatch<SetStateAction<BookMenuMode>>;
}

export default function ViewMode({ isModalActive, setIsModalActive, setMode }: ViewModeProps) {
  const { user } = useUserData();

  const { book, isLoading } = useBook();

  const { isSmallScreen } = useScreen();

  const [isImageLoaded, setIsImageLoaded] = useState(true);

  useLayoutEffect(() => {
    setIsImageLoaded(true);
  }, [book]);

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
            className="flex flex-col w-full 2md:min-w-[900px] min-h-[400px] gap-4 pb-6 2md:p-6 h-fit"
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
                <div className="relative flex flex-col 2md:flex-row gap-6">
                  {!isSmallScreen && book && book.owner != user?.id && (
                    <div className="absolute -top-6 -right-6 pr-6 pl-16 py-6 rounded-bl-[100%] bg-[#AAB6F5] rounded-tr-[7px] duration-200">
                      <div className="flex flex-col items-center ranslate-x-6 -translate-y-2 gap-1">
                        <Image
                          quality={100}
                          height={96}
                          width={96}
                          alt=""
                          title={book.ownerData.name + " " + book.ownerData.surname}
                          src={book?.ownerData.avatar}
                          className={`w-16 h-16 rounded-full cursor-pointer object-cover t`}
                        ></Image>
                        <div className="font-head font-light duration-200 text-[#18559F]">{book.ownerData.name}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col 2md:gap-6 shrink-0 2md:w-[220px]">
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
                  <div className="flex flex-col gap-8 items-center text-center 2md:items-start 2md:text-left px-6 2md:p-0">
                    <div className="font-head font-normal text-[20px]">{book.title}</div>
                    <div className="w-full grid grid-cols-[repeat(2,1fr)] grid-rows-2 font-extralight leading-none text-[14px] gap-y-6 gap-x-10 2md:gap-x-10 2md:pr-10">
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
                      className="text-[#474747] font-light font-inter text-[15px] 2md:w-[500px] max-h-[180px] overflow-y-auto break-all"
                    >
                      {book.description}
                    </div>
                    {isSmallScreen && (
                      <div className="flex flex-col gap-2.5 w-full">
                        <div className="flex gap-2.5 w-full py-3 justify-center border border-dashed border-spacing-4 border-[#9CABFF]">
                          <Image
                            quality={100}
                            height={96}
                            width={96}
                            alt=""
                            title={book.ownerData.name + " " + book.ownerData.surname}
                            src={book?.ownerData.avatar}
                            className={`w-14 h-14 rounded-full cursor-pointer duration-200 object-cover`}
                          ></Image>
                          <div className="flex flex-col justify-center text-left object-cover font-head">
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
              <div className="flex flex-col items-center justify-center 2md:justify-start flex-1 2md:h-auto w-full gap-6">
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

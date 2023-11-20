import { useBook } from "@/components/contexts/BookProvider"
import { useUserData } from "@/components/contexts/UserProvider"
import PublicationField from "@/components/ui/PublicationField"
import LanguageIcon from "@/components/ui/icons/LanguageIcon"
import LeafIcon from "@/components/ui/icons/LeafIcon"
import NotFoundIcon from "@/components/ui/icons/NotFoundIcon"
import ProfileIcon from "@/components/ui/icons/ProfileIcon"
import TagIcon from "@/components/ui/icons/TagIcon"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ReservationMenu from "./ReservationMenu"
import { messengers } from "../publication_menu/PublicationMenu"
import ContentLoader from "@/components/ui/loaders/ContentLoader"
import toast from "react-hot-toast"
import { BookMenuMode } from "./BookMenu"
import { useScreen } from "@/components/contexts/ScreenProvider"
import Buttons from "./Buttons"
import BookMenuLoader from "@/components/ui/loaders/skeleton/BookMenuLoader"

interface ViewModeProps {
  isModalActive: boolean
  setIsModalActive: Dispatch<SetStateAction<boolean>>
  setMode: Dispatch<SetStateAction<BookMenuMode>>
}

export default function ViewMode({
  isModalActive,
  setIsModalActive,
  setMode,
}: ViewModeProps) {
  const { user } = useUserData()

  const { book, isLoading } = useBook()

  const [isImageLoaded, setIsImageLoaded] = useState(true)
  const [isImageHovered, setIsImageHovered] = useState(false)

  const { isSmallScreen } = useScreen()

  useEffect(() => {
    if (isModalActive) {
      setIsImageLoaded(true)
    }
  }, [isModalActive])

  return (
    <>
      <div className="flex flex-col w-full md:min-w-[700px] min-h-[400px] gap-4 md:p-6 h-fit">
        {isLoading ? (
          <BookMenuLoader></BookMenuLoader>
        ) : book ? (
          <>
            {book.reservatorData && book?.owner == user?.id && (
              <div className="flex flex-col gap-2 bg-[#EDFFE4] rounded-md p-3.5 text-[15px] font-inter">
                <div>
                  <span className="border-b border-b-black/80 cursor-pointer font-normal">
                    {book?.reservatorData?.name} {book?.reservatorData?.surname}
                  </span>
                  <span className="font-light">
                    chce Twoją książkę. Kiedy potwierdzisz wymianę dostaniesz 1
                    punkt.
                  </span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div className="p-1.5 px-4 rounded-full bg-[#61C558] text-white font-normal cursor-pointer">
                    Potwierdź wymianę
                  </div>
                  <div className="p-1 px-4 rounded-full border-[#61C558] border-2 box-border text-[#61C558] font-normal cursor-pointer">
                    Anuluj
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex flex-col gap-10 shrink-0 md:w-[220px]">
                <div className="relative shrink-0">
                  <div
                    className="relative w-full aspect-[3/4]"
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                  >
                    {isImageLoaded ? (
                      <>
                        <Image
                          quality={100}
                          fill={true}
                          src={book.image}
                          alt=""
                          className={`object-cover`}
                          onLoad={() => {
                            setIsImageLoaded(true)
                          }}
                          onError={() => {
                            setIsImageLoaded(false)
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
                  <Image
                    quality={100}
                    height={64}
                    width={64}
                    alt=""
                    title={book.ownerData.name + " " + book.ownerData.surname}
                    src={book?.ownerData.avatar}
                    className={`absolute bottom-0 w-16 h-16 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-full bg-gray-500 cursor-pointer duration-200 ${
                      isImageHovered ? "opacity-0" : "opacity-100"
                    }`}
                  ></Image>
                </div>
                {!isSmallScreen && <Buttons setMode={setMode}></Buttons>}
              </div>
              <div className="flex flex-col gap-8 items-center text-center md:items-start md:text-left pb-10 px-6 md:px-14 md:p-0">
                <div className="font-head font-normal text-[20px]">
                  {book.title}
                </div>
                <div className="grid grid-cols-[repeat(2,auto)] grid-rows-2 font-extralight leading-none text-[14px] gap-y-6 gap-x-10 w-fit md:pr-10">
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
                  className="text-[#474747] font-light font-inter text-[15px] md:w-[500px] max-h-[180px] overflow-y-auto break-all
                                "
                >
                  {book.description}
                </div>
                {isSmallScreen && <Buttons setMode={setMode}></Buttons>}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center md:justify-start flex-1 md:h-auto w-full gap-6">
            <div className="text-2xl">Takiej książki nie ma</div>
            <div className="w-3/4">
              <NotFoundIcon></NotFoundIcon>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

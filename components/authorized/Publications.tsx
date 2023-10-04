import { useEffect, useRef, useState } from "react";
import BookMenu from "./BookMenu";
import { messenger } from "./Contact";
import ContentLoader from "../ui/ContentLoader";
import Book from "../ui/Book";
import PublicationMenu from "./PublicationMenu";
import AddBookBtn from "../ui/AddBookBtn";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import FilterBar from "./FilterBar";
import { useSearchParams } from "next/navigation";

export type bookData = {
    title: string;
    owner: string;
    author: string;
    description: string;
    category: string;
    image: string;
    messenger: messenger;
    messengerDescription: string;
    date: string;
};

const limit = 10;

export default function Publications() {
    const params = useSearchParams();

    const [isPublicationModalActive, setIsPublicationModalActive] = useState(false);
    const [isBookModalActive, setIsBookModalActive] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState<bookData[]>([]);

    const [currentBook, setCurrentBook] = useState<bookData>({
        title: "",
        owner: "",
        author: "",
        description: "",
        category: "",
        messenger: "Telegram",
        messengerDescription: "",
        image: "",
        date: "",
    });

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPage(0)
        setHasMore(true)
        setBooks([])
    }, [params])

    useEffect(() => {
        if (isLoading && hasMore) {
            getPublications();
        }

        async function getPublications() {
            const categories = params.get("categories")?.split(",");
            const languages = params.get("languages")?.split(",");
            const states = params.get("states")?.split(",");

            const response = await fetch("/api/getPublications", {
                method: "POST",
                body: JSON.stringify({
                    limit,
                    page,
                    filter: {
                        categories,
                        languages,
                        states,
                    },
                }),
            });

            const fetchedBooks: bookData[] = await response.json();

            setPage((prev) => prev + 1);
            setIsLoading(false);

            if (fetchedBooks.length === 0) {
                setHasMore(false);
                setPage((prev) => prev - 1);
                return;
            }

            setBooks([...books, ...fetchedBooks]);
        }
    }, [isLoading, hasMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsLoading(true);
                }
            },
            {
                rootMargin: "100px",
            }
        );

        if (observerRef.current && hasMore) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.disconnect();
        };
    }, [observerRef, observerRef.current, hasMore, isLoading]);

    function handleAddBookClick() {
        setIsPublicationModalActive(true);
    }

    return (
        <div className="flex flex-col items-center gap-10 pt-10">
            <div className="text-center text-[25px] font-normal px-6 max-w-[800px] box-content">
                Wierzymy, że korzystanie z serwisu może dostarczyć wiele radości i wzbogacić Twoje doświadczenie
                czytelnicze.
            </div>
            <FilterBar></FilterBar>
            <div className="px-28 flex flex-col gap-6 items-center">
                <TransitionGroup className="flex gap-6 flex-wrap justify-center">
                    {books &&
                        books.map((book, index) => (
                            <CSSTransition key={index} classNames="item" timeout={500}>
                                <Book
                                    key={index}
                                    data={book}
                                    handleClick={() => {
                                        setCurrentBook(book);
                                        setIsBookModalActive(true);
                                    }}
                                />
                            </CSSTransition>
                        ))}
                    <div ref={observerRef} className="absolute bottom-0"></div>
                </TransitionGroup>
                {isLoading && (
                    <div className="w-6 h-6 relative">
                        <ContentLoader></ContentLoader>
                    </div>
                )}
            </div>

            <AddBookBtn onClick={handleAddBookClick} />

            <PublicationMenu
                isModalActive={isPublicationModalActive}
                setIsModalActive={setIsPublicationModalActive}
                setBooks={setBooks}
            />

            <BookMenu
                isBookModalActive={isBookModalActive}
                setIsBookModalActive={setIsBookModalActive}
                data={currentBook}
            />
        </div>
    );
}

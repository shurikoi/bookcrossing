import ContentLoader from "../ui/ContentLoader";
import Book from "../ui/Book";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { bookData, bookQuery } from "./Main";
import { useFilter } from "../contexts/FilterProvider";

interface PublicationsProps {
    setCurrentBook: Dispatch<SetStateAction<bookData>>;
    setIsBookModalActive: Dispatch<SetStateAction<boolean>>;
    setBooks: Dispatch<SetStateAction<bookData[]>>;
    setBooksCount: Dispatch<SetStateAction<number>>;
    setBooksQueryCount: Dispatch<SetStateAction<number>>;
    setIsBooksLoading: Dispatch<SetStateAction<boolean>>;
    books: bookData[];
    isBooksLoading: boolean;
}

const limit = 10;

export default function Publications({
    setCurrentBook,
    setIsBookModalActive,
    setBooks,
    books,
    setBooksCount,
    setBooksQueryCount,
    setIsBooksLoading,
    isBooksLoading,
}: PublicationsProps) {
    const filter = useFilter();

    const timerRef = useRef<NodeJS.Timer | null>(null);

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPage(0);
        setHasMore(true);
        setBooks([]);
    }, [filter.query]);

    useEffect(() => {
        if (isBooksLoading && hasMore) {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => getPublications(), 500);
        }

        async function getPublications() {
            // const categories = filter.choosenCategories;
            // const languages = filter.choosenLanguages;
            // const states = filter.choosenStates;
            console.log(filter.query)
            const response = await fetch("/api/getPublications", {
                method: "POST",
                body: JSON.stringify({
                    limit,
                    page,
                    filter: filter.query,
                }),
            });

            const data: {
                publications: bookData[];
                count: number;
                queryCount: number;
            } = await response.json();

            const fetchedBooks = data.publications;

            setPage((prev) => prev + 1);
            setIsBooksLoading(false);

            if (fetchedBooks.length === 0 || fetchedBooks.length < limit) {
                setHasMore(false);
                setPage((prev) => prev - 1);
            }

            setCurrentBook(
                fetchedBooks[0] || {
                    title: "",
                    owner: "",
                    author: "",
                    description: "",
                    category: "",
                    messenger: "Telegram",
                    messengerDescription: "",
                    image: "",
                    date: "",
                }
            );

            setBooks((books) => [...books, ...fetchedBooks]);

            setBooksCount(data.count);
            setBooksQueryCount(data.queryCount);
        }
    }, [isBooksLoading, hasMore, filter.query]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsBooksLoading(true);
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
    }, [observerRef, observerRef.current, hasMore, isBooksLoading]);

    return (
        <div className="px-28 py-10 flex flex-col gap-6 items-center w-full h-full bg-[#f8faff] ">
            <TransitionGroup className="flex gap-6 flex-wrap justify-center" exit={false}>
                {books &&
                    books.map((book, index) => (
                        <CSSTransition key={index} classNames="item" timeout={500} >

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
            {isBooksLoading && (
                <div className="w-6 h-6 relative">
                    <ContentLoader></ContentLoader>
                </div>
            )}
        </div>
    );
}

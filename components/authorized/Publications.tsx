import ContentLoader from "../ui/ContentLoader";
import Book from "../ui/Book";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { bookData, bookQuery, publication } from "./Main";
import { useFilter } from "../contexts/FilterProvider";
import { useBook } from "../contexts/BookProvider";

interface PublicationsProps {
    setBooks: Dispatch<SetStateAction<publication[]>>;
    setBooksCount: Dispatch<SetStateAction<number>>;
    setBooksQueryCount: Dispatch<SetStateAction<number>>;
    setIsBooksLoading: Dispatch<SetStateAction<boolean>>;
    books: publication[];
    isBooksLoading: boolean;
}

interface fetchData {
    publications: publication[];
    count: number;
    queryCount: number;
}

const limit = 10;

export default function Publications({
    setBooks,
    books,
    setBooksCount,
    setBooksQueryCount,
    setIsBooksLoading,
    isBooksLoading,
}: PublicationsProps) {
    const filter = useFilter();

    const { setBookId } = useBook();

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
            const response = await fetch("/api/get-publications", {
                method: "POST",
                body: JSON.stringify({
                    limit,
                    page,
                    query: filter.query,
                }),
            });

            const data: fetchData = await response.json();

            const fetchedBooks : publication[] = data.publications;

            setPage((prev) => prev + 1);
            setIsBooksLoading(false);

            if (fetchedBooks.length === 0 || fetchedBooks.length < limit) {
                setHasMore(false);
                setPage((prev) => prev - 1);
            }

            setBooks((books) => [...books, ...fetchedBooks]);

            setBooksCount(data.count);
            setBooksQueryCount(fetchedBooks.length);
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
        <div className="px-28 py-10 flex w-full flex-col gap-6 items-center bg-[#f8faff] h-full">
            <TransitionGroup className="flex gap-6 flex-wrap justify-center" exit={false}>
                {books &&
                    books.map((book, index) => (
                        <CSSTransition key={index} classNames="item" timeout={500}>
                            <Book
                                key={index}
                                data={book}
                                handleClick={() => {
                                    console.log(book)
                                    setBookId(book.id!);
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

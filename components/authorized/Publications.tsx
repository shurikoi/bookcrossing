import ContentLoader from "../ui/ContentLoader";
import Book from "../ui/Book";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Dispatch, SetStateAction, memo, useEffect, useRef, useState } from "react";
import { publication } from "./Main";
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

export default memo(function Publications({
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

            const fetchedBooks: publication[] = data.publications;

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
        <div className="px-24 py-10 flex w-full flex-col gap-8 items-center bg-[linear-gradient(180deg,rgba(248,250,255,1)_40%,rgba(255,255,255,1)_80%)] ">
            <div className="flex gap-8 flex-wrap justify-center">
                {books && (
                    <TransitionGroup component={null} exit={false}>
                        {books.map((book, index) => (
                            <CSSTransition key={book.id}  classNames="item" timeout={500}>
                                <Book key={index} data={book} handleClick={() => setBookId(book.id!)} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                )}
                <div ref={observerRef} className="absolute bottom-0"></div>
            </div>
            {isBooksLoading && (
                <div className="w-6 h-6 relative">
                    <ContentLoader></ContentLoader>
                </div>
            )}
        </div>
    );
});

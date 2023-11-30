import Book from "../ui/Book";
import { memo, useLayoutEffect, useEffect, useRef, useState, useMemo } from "react";
import { publication } from "./Main";
import { useFilter } from "../contexts/FilterProvider";
import { useBook } from "../contexts/BookProvider";
import PublicationsLoader from "../ui/loaders/skeleton/PublicationsLoader";

interface fetchData {
  publications: publication[];
  queryBooksCount: number;
}

const limit = 20;

const Publications = memo(() => {
  const { query } = useFilter();

  const {
    setBookId,
    setBooks,
    books,
    book,
    isBooksLoading,
    setIsBooksLoading,
    page,
    hasMore,
    setPage,
    setHasMore,
    setQueryBooksCount,
  } = useBook();

  const observer = useRef<IntersectionObserver | null>(null);

  const timerRef = useRef<NodeJS.Timer | null>();

  const [isDataFetched, setIsDataFetched] = useState(true);

  const observerRef = useRef<HTMLDivElement>(null);

  const abortControllerRef = useRef<AbortController>();

  useLayoutEffect(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort("new-fetch");

    setPage(0);
    setHasMore(true);
    setIsDataFetched(true);
    setBooks([]);
    setIsBooksLoading(true);
  }, [query]);

  useLayoutEffect(() => {
    if (isDataFetched && isBooksLoading && hasMore) getPublications();

    async function getPublications() {
      setIsDataFetched(false);
      setIsBooksLoading(true);

      if (abortControllerRef.current) abortControllerRef.current.abort("new-fetch");

      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch("/api/get-publications", {
          method: "POST",
          body: JSON.stringify({ limit, page, query }),
          signal: abortControllerRef.current.signal,
        });

        const data: fetchData = await response.json();

        const fetchedBooks: publication[] = data.publications;

        setIsDataFetched(true);

        setPage((prev) => prev + 1);

        if (fetchedBooks.length === 0 || fetchedBooks.length < limit) {
          setHasMore(false);
          setPage((prev) => prev - 1);
        }

        setBooks((books) => [...books, ...fetchedBooks]);
        setQueryBooksCount(data.queryBooksCount);
      } catch (error) {}

      setIsBooksLoading(false);
    }
  }, [hasMore, isDataFetched, timerRef, query, isBooksLoading, page]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsBooksLoading(true);
      },
      {
        rootMargin: "480px",
      }
    );
  }, []);

  useEffect(() => {
    if (observerRef.current && hasMore && observer.current) observer.current.observe(observerRef.current);

    return () => {
      if (observerRef.current && observer.current) observer.current.disconnect();
    };
  }, [observerRef, observer, hasMore, isBooksLoading, isDataFetched]);

  const memoizedBooks = useMemo(
    () => books && books.map((book, index) => <Book key={index} data={book} handleClick={() => setBookId(book.id!)} />),
    [books, book]
  );

  return (
    <div className="px-24 py-10 flex w-full flex-col gap-8 items-center bg-[linear-gradient(180deg,rgba(248,250,255,1)_40%,rgba(255,255,255,1)_80%)] ">
      <div className="relative flex gap-8 flex-wrap justify-center">
        {memoizedBooks}
        {isBooksLoading && <PublicationsLoader></PublicationsLoader>}
        <div ref={observerRef} className="absolute bottom-0"></div>
      </div>
    </div>
  );
});

Publications.displayName = "Publications";

export default Publications;

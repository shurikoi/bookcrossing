import { Dispatch, SetStateAction, createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { bookData, publication } from "../authorized/Main";

interface BookContext {
  setBookId: Dispatch<SetStateAction<string>>;
  book: bookData | undefined;
  setBook: Dispatch<SetStateAction<bookData | undefined>>;
  books: publication[];
  setBooks: Dispatch<SetStateAction<publication[]>>;
  fetchedBooks: { [key: string]: bookData };
  setFetchedBooks: Dispatch<SetStateAction<{ [key: string]: bookData }>>;
  bookId: string;
  isLoading: boolean;
  isBooksLoading: boolean;
  setIsBooksLoading: Dispatch<SetStateAction<boolean>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  queryBooksCount: number;
  setQueryBooksCount: Dispatch<SetStateAction<number>>;
}

const BookContext = createContext<BookContext>({
  setBookId: () => {},
  fetchedBooks: {},
  setFetchedBooks: () => {},
  books: [],
  setBooks: () => {},
  bookId: "",
  book: undefined,
  setBook: () => {},
  isLoading: true,
  isBooksLoading: true,
  setIsBooksLoading: () => {},
  page: 0,
  setPage: () => {},
  hasMore: true,
  setHasMore: () => {},
  queryBooksCount: 0,
  setQueryBooksCount: () => {},
});

function BookProvider({ children }: { children: React.ReactNode }) {
  const params = new URLSearchParams(typeof window !== "undefined" ? window?.location.search : "");

  const [bookId, setBookId] = useState(params.get("book") || "");
  const [book, setBook] = useState<bookData>();

  const [books, setBooks] = useState<publication[]>([]);
  const [fetchedBooks, setFetchedBooks] = useState<{ [key: string]: bookData }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isBooksLoading, setIsBooksLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [queryBooksCount, setQueryBooksCount] = useState(0);

  useLayoutEffect(() => {
    params.set("book", bookId);

    if (!bookId) params.delete("book");

    history.pushState({}, "", params.size > 0 ? `/?${params}` : "/");
    console.log(fetchedBooks)
    if (!!bookId && !fetchedBooks[bookId]) getBook(bookId);
    else if (fetchedBooks[bookId]) setBook(fetchedBooks[bookId]);

    async function getBook(id: string) {
      setIsLoading(true);

      const response = await fetch("/api/get-publication", {
        method: "POST",
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const book: bookData = await response.json();

        setBook(book);
      }

      setIsLoading(false);
    }
  }, [bookId]);

  useLayoutEffect(() => {
    if (book && !Object.keys(fetchedBooks).some((fetchedBook) => fetchedBook == bookId))
      setFetchedBooks((fetchedBooks) => {
        return { ...fetchedBooks, [book?.id]: book };
      });
    console.log(book)

  }, [book]);

  return (
    <BookContext.Provider
      value={{
        setBookId,
        book,
        setBook,
        isLoading,
        bookId,
        fetchedBooks,
        setFetchedBooks,
        books,
        setBooks,
        isBooksLoading,
        setIsBooksLoading,
        page,
        setPage,
        hasMore,
        setHasMore,
        queryBooksCount,
        setQueryBooksCount,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

function useBook() {
  const book = useContext(BookContext);

  return book;
}

export { useBook, BookProvider };

import { useEffect, useState } from "react";
import AddBookBtn from "./ui/AddBookBtn";
import Book from "./ui/Book";
import ModalMenu from "./ui/ModalMenu";
import PublicationForm from "./PublicationForm";
import ContentLoader from "./ContentLoader";
import BookMenu from "./BookMenu";

export type data = {
    title: string;
    owner: string;
    author: string;
    description: string;
    category: string;
    image: string;
    date: number;
};

export default function Publications() {
    const [isPublicationModalActive, setIsPublicationModalActive] = useState<boolean>(false);
    const [isBookModalActive, setIsBookModalActive] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<data[]>();

    const [currentBook, setCurrentBook] = useState<data>();

    useEffect(() => {
        getPublications();

        async function getPublications() {
            const books = (await fetch("/api/getPublications", {
                method: "POST",
            }).then((data) => {
                return data.json();
            })) as data[];

            setData(books);
            setCurrentBook(books[0]);
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="px-28 py-16">
            <div className="flex gap-6 flex-wrap justify-center">
                {isLoading ? (
                    <ContentLoader></ContentLoader>
                ) : (
                    data &&
                    data.map((data, index) => (
                        <Book
                            key={index}
                            onClick={() => {
                                setCurrentBook(data);

                                setIsBookModalActive(true);
                            }}
                            title={data.title}
                            image={data.image}
                            author={data.author}
                            date={"dzisiaj"}
                        />
                    ))
                )}
            </div>

            <AddBookBtn onClick={() => setIsPublicationModalActive(true)} />
            <ModalMenu
                modalActive={isPublicationModalActive}
                setModalActive={setIsPublicationModalActive}
                style={{ padding: "25px" }}
            >
                <PublicationForm />
            </ModalMenu>

            {currentBook && (
                <ModalMenu
                    modalActive={isBookModalActive}
                    setModalActive={setIsBookModalActive}
                    style={{ padding: "25px" }}
                >
                    <BookMenu data={currentBook}></BookMenu>
                </ModalMenu>
            )}
        </div>
    );
}

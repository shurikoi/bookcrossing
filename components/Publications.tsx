import { useEffect, useState } from "react";
import AddBookBtn from "./ui/AddBookBtn";
import Book from "./ui/Book";
import ModalMenu from "./ui/ModalMenu";
import PublicationForm from "./PublicationForm";
import Loader from "./ContentLoader";
import BookMenu from "./BookMenu";

type data = {
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
    const [currentBook, setCurrentBook] = useState<data>({
        author: "",
        category: "",
        date: 0,
        description: "",
        image: "",
        owner: "",
        title: "",
    });
    useEffect(() => {
        getPublications();

        async function getPublications() {
            const books = (await fetch("/api/getPublications", {
                method: "POST",
            }).then((data) => {
                setIsLoading(false);
                return data.json();
            })) as data[];

            setData(books);
        }
    }, []);

    return (
        <div className="px-28 py-16">
            <div className="flex gap-6 flex-wrap justify-center">
                {isLoading ? (
                    <Loader></Loader>
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

            <ModalMenu
                modalActive={isBookModalActive}
                setModalActive={setIsBookModalActive}
                style={{ padding: "25px" }}
            >
                <BookMenu data={currentBook}></BookMenu>
            </ModalMenu>
        </div>
    );
}

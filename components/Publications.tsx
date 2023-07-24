import { useEffect, useState } from "react";
import AddBookBtn from "./ui/AddBookBtn";
import Book from "./ui/Book";
import ModalMenu from "./ui/ModalMenu";
import PublicationForm from "./PublicationForm";

type data = {
    title: string;
    image: string
};

export default function Publications() {
    const [modalActive, setModalActive] = useState<boolean>(true);
    const [data, setData] = useState<data[]>();

    useEffect(() => {
        getPublications();

        async function getPublications() {
            const books = await fetch("/api/getPublications", {
                method: "POST",
            }).then((data) => data.json());
            
            setData(books);
        }
    }, []);

    return (
        <div className="px-28 py-16">
            <div className="flex gap-6 flex-wrap justify-center">
                {data && data.map((data) => (
                    <Book title={data.title} image={data.image} author={"nikita"} date={"dzisiaj"} />
                ))}
            </div>
            <AddBookBtn onClick={() => setModalActive(true)} />
            <ModalMenu modalActive={modalActive} setModalActive={setModalActive} padding="25px">
                <PublicationForm></PublicationForm>
            </ModalMenu>
        </div>
    );
}

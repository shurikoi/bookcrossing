import { useEffect, useState } from "react";

export default function PublicationImage({ file }: { file: File | undefined }) {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        if (file) setImage(URL.createObjectURL(file));
    }, [file]);

    return <img className="w-[400px] object-cover" src={image} alt="" />;
}

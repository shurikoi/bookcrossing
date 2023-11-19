import ContentLoader from "@/components/ui/loaders/ContentLoader";
import Image from "next/image";
import { useState } from "react";

export default function PublicationImage({ image }: { image: string | undefined }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && (
                <div className="w-full h-full bg-white">
                    <ContentLoader></ContentLoader>
                </div>
            )}
            <Image
                className="object-cover"
                onLoadingComplete={() => setIsLoading(false)}
                fill
                src={image || ""}
                alt=""
            />
        </>
    );
}

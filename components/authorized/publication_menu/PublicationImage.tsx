import ContentLoader from "@/components/ui/ContentLoader";
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
                className="object-cover w-full h-full"
                onLoadingComplete={() => setIsLoading(false)}
                width={0}
                height={0}
                src={image || ""}
                alt=""
            />
        </>
    );
}

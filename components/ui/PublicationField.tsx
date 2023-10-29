interface PublicationFieldProps {
    title: string | undefined;
    icon: React.ReactNode;
    data: string | undefined;
    bg: string;
}

export default function PublicationField({ title, icon, data, bg }: PublicationFieldProps) {
    return (
        <div className="flex flex-col gap-3 whitespace-nowrap items-center md:items-left">
            <div className="flex gap-3 items-center">
                {icon}
                <div className="text-[#4E4E4E]">{title}</div>
            </div>
            <div className={`py-2 px-3 w-fit ${bg} rounded-sm max-w-[180px] overflow-hidden text-ellipsis`} title={data}>{data}</div>
        </div>
    );
}
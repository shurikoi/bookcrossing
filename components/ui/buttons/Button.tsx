interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <div
            className="bg-[#52CD4F] shadow-[0px_2px_4px_0px_rgba(79,114,205,0.20)] text-[15px] text-white rounded-[8px] cursor-pointer py-2 px-6"
            {...props}
        >
            {children}
        </div>
    );
}

interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Button({ children, ...props }: ButtonProps) {
    const { className = "", ...rest } = props;

    return (
        <div
            className={`bg-[#52CD4F] font-inter font-regular shadow-[0px_2px_4px_0px_rgba(79,114,205,0.20)] text-[16px] text-white rounded-[8px] cursor-pointer py-2 px-6 will-change-transform select-none active:scale-[0.99] duration-300 ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
}

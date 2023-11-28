interface ButtonProps extends React.HTMLAttributes<HTMLDivElement>{
    disabled?: boolean
}

export default function Button({ children, className, disabled = false, onClick, ...props }: ButtonProps) {
    return (
        <div
            className={`bg-[#52CD4F] font-inter font-regular shadow-[0px_2px_4px_0px_rgba(79,114,205,0.20)] text-[16px] text-white rounded-[8px] py-3 px-6 will-change-transform select-none active:scale-[0.99] duration-300 leading-none ${disabled ? "opacity-40 cursor-default" : "opacity-100 cursor-pointer"} ${className}`}
            {...props}
            onClick={!disabled && onClick ? onClick : undefined}
        >
            {children}
        </div>
    );
}

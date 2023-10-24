interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    variaty: "filled" | "empty";
    backgroundColor: string;
    textColor: string;
    children: React.ReactNode;
}

export default function Button({ variaty, backgroundColor, textColor, children, ...props }: ButtonProps) {
    const styles = {
        background:
            variaty == "filled" ? `${backgroundColor} hover:bg-transparent` : "hover:${backgroundColor} bg-transparent",
        text: variaty == "filled" ? `hover:text-white ${textColor}]` : `hover:text-white ${textColor}]`,
    };

    return (
        <div
            className={`font-inter font-medium py-2.5 border-2 active:scale-[0.99] will-change-transform text-center rounded-lg cursor-pointer duration-300 select-none ${
                (styles.background, styles.text)
            }`}
            {...props}
        >
            {children}
        </div>
    );
}

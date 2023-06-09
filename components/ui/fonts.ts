import localFont from "next/font/local";

export const eUkraine = localFont({
    src: [
        {
            path: "../../public/fonts/e-UkraineHead-Regular.otf",
            weight: "600",
        },
        {
            path: "../../public/fonts/e-Ukraine-Regular.otf",
            weight: "500",
        },
        {
            path: "../../public/fonts/e-UkraineHead-Light.otf",
            weight: "400",
        },
        {
            path: "../../public/fonts/e-Ukraine-Light.otf",
            weight: "300",
        },
        {
            path: "../../public/fonts/e-Ukraine-Thin.otf",
            weight: "200",
        },
    ],
});

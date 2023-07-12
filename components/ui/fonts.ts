import localFont from "next/font/local";

const startPath: string = "../../public";

const helveticaNeueCyr = localFont({
    src: [
        {
            path: "../../public/fonts/helveticaneuecyr_black.otf",
            weight: "900",
        },
        {
            path: "../../public/fonts/helveticaneuecyr_medium.ttf",
            weight: "500",
        },
        {
            path: "../../public/fonts/helveticaneuecyr_roman.otf",
            weight: "400",
        },
        {
            path: "../../public/fonts/helveticaneuecyr_ultralightitalic.otf",
            weight: "200",
            style: "italic",
        },
        {
            path: "../../public/fonts/helveticaneuecyr_ultralight.otf",
            weight: "200",
        },
        {
            path: "../../public/fonts/helveticaneuecyr_thin.otf",
            weight: "100",
        },
    ],
});

const eUkraine = localFont({
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

export { eUkraine, helveticaNeueCyr };

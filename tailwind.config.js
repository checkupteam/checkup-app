const { keyframes } = require("@emotion/react");
const konstaConfig = require("konsta/config");

module.exports = konstaConfig({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                accent: "#5938bc",
                primary: "#000000",
                ["darker-violet"]: {
                    100: "#e3dcf0",
                    200: "#c6b8e0",
                    300: "#a994d1",
                    400: "#8d70c2",
                    500: "#704db3",
                    600: "#5a3d8f",
                    700: "#432e6b",
                    800: "#2d1f47",
                    850: "#211435",
                    900: "#160f24",
                    950: "#0a0712",
                },
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
                slideIn: {
                    "0%": { transform: "translateY(20%)", opacity: 0 },
                    "100%": { transform: "translateX(0)", opacity: 1 },
                },
                fill: {
                    "0%": { width: "0%" },
                    "100%": { width: "100%" },
                },
            },
            animation: {
                fadeIn: "fadeIn 0.1s ease-in-out",
                slideIn: "slideIn 0.2s ease-in-out",
                fill: "fill 0.3s ease-in-out",
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
});

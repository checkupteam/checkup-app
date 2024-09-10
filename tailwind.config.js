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
            },
            animation: {
                fadeIn: "fadeIn 0.1s ease-in-out",
                slideIn: "slideIn 0.2s ease-in-out",
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
});

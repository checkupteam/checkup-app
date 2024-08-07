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
        },
    },
    plugins: [],
});

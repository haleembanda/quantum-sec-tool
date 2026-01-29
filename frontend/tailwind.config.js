/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    900: '#050a14',
                    800: '#0a192f',
                    700: '#112240',
                    500: '#64ffda', // Neon Cyan
                    400: '#00b4d8',
                    accent: '#fd005f', // Neon Pink
                }
            },
            fontFamily: {
                mono: ['"Fira Code"', 'monospace'],
                display: ['"Orbitron"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

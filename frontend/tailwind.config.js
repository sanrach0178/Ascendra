/** @type {import('tailwindcss').Config} */

const primary = {
    50: '#020617', // Slate 950
    100: '#020617', // Slate 950
    200: '#020617', // Slate 950
    300: '#0f172a', // Slate 900
    400: '#1e293b', // Slate 800 (Matte Dark Blue - Text/Icons)
    500: '#0f172a', // Slate 900 (Deep Matte Blue - Main Brand)
    600: '#020617', // Slate 950
    700: '#000000', // Black
    800: '#000000', // Black
    900: '#000000', // Black
    950: '#000000', // Black
};

const dark = {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
};

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: primary,
                dark: dark,
                // Enforce Two-Color Theme by aliasing other colors to Primary (Cobalt)
                cyan: primary,
                teal: primary,
                emerald: primary,
                green: primary,
                indigo: primary,
                violet: primary,
                sky: primary,
                blue: primary,
                // Enforce Matte Black by aliasing grays to Dark (Zinc)
                slate: dark,
                gray: dark,
                zinc: dark,
                neutral: dark,
                stone: dark,
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

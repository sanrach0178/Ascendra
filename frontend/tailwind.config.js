/** @type {import('tailwindcss').Config} */

const primary = {
    50: '#172554', // Deep Navy
    100: '#172554', // Deep Navy
    200: '#172554', // Deep Navy
    300: '#1e3a8a', // Navy
    400: '#1e40af', // Cobalt (The "lightest" accent now)
    500: '#1e3a8a', // Navy (Main Brand)
    600: '#172554', // Deep Navy
    700: '#0b1120', // Almost Black
    800: '#020617', // Black
    900: '#000000', // Pure Black
    950: '#000000', // Pure Black
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

/** @type {import('tailwindcss').Config} */

const primary = {
    50: '#172554', // Keep backgrounds dark
    100: '#172554',
    200: '#1e3a8a',
    300: '#1e40af',
    400: '#3b82f6', // Vibrant Blue (Icons)
    500: '#2563eb', // Royal Blue (Buttons/Brand)
    600: '#1d4ed8', // Darker Royal (Hover)
    700: '#1e40af', // Cobalt
    800: '#1e3a8a', // Navy
    900: '#172554', // Midnight
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

/** @type {import('tailwindcss').Config} */

const primary = {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
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

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Darker Grotesque', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                display: ['Homemade Apple', 'cursive'],
            },
            colors: {
                error: '#e50303',
                warning: '#ffd100',
                success: '#00e686',
                info: '#0067c5',
                grey: {
                    50: '#f1f3f4',
                    100: '#e4e7eb',
                    200: '#ccd2d8',
                    300: '#9ca5b0',
                    400: '#7d8793',
                    500: '#636e7b',
                    600: '#55606c',
                    700: '#414c58',
                    800: '#353f4a',
                    900: '#212932',
                },
            },
        },
    },
    plugins: [],
}
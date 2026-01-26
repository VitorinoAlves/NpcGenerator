/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Exemplo de cores para o tema "Grimoire"
                parchment: '#F5E6D3',
                medievalGold: '#D4AF37',
            }
        },
    },
    plugins: [],
}
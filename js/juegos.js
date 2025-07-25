//JS para la pagina videojuegos
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            keyframes: {
                dimlight: {
                    '0%, 18%, 20%, 50.1%, 60%, 65.1%, 80%, 90.1%, 92%': {
                        color: '#0e3742',
                        boxShadow: 'none',
                    },
                    '18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100%': {
                        color: '#fff',
                        textShadow: '0 0 10px #03bcf4',
                    },
                },
            },
            animation: {
                dimlight: 'dimlight 5s infinite',
            },
        },
    },
    plugins: [
        function ({
            addUtilities
        }) {
            addUtilities({
                '.box-reflect': {
                    '-webkit-box-reflect': 'below 1px linear-gradient(transparent, #0004)',
                },
            });
        },
    ],
}
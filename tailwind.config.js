/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        forest: '#1B4332',
        'forest-dark': '#0D2818',
        sage: '#6B8F71',
        coral: '#E85D4C',
        cream: '#FAF7F2',
        stone: '#E8E4DC',
        'green-tint': '#E8F5E9',
      },
    },
  },
  plugins: [],
};

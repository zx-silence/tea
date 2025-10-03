import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9f4',
          100: '#daf1e3',
          200: '#b8e3c9',
          300: '#88cfa7',
          400: '#56b27f',
          500: '#349761',
          600: '#257a4d',
          700: '#1e6140',
          800: '#1a4d34',
          900: '#16402c',
        },
        tea: {
          light: '#e8f5e9',
          DEFAULT: '#4caf50',
          dark: '#2e7d32',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;

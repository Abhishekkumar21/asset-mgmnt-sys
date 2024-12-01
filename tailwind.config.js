/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1890ff',
          dark: '#096dd9',
        },
      },
      boxShadow: {
        card: '0 8px 24px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
  // This ensures Tailwind's classes take precedence over Ant Design's default styles
  important: true,
}

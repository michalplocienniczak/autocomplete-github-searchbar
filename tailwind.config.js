/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        danger: "var(--danger)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        border: "var(--border)",
        background: "var(--background)",
        "background-hover": {
          DEFAULT: "var(--background-hover)",
          secondary: "var(--background-hover-secondary)",
        },
      },
    },
  },
  plugins: [],
}

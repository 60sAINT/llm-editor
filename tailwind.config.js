/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'primary': "#1677ff",
        'description': "#8e8e8e",
      },
    },
  },
  plugins: [],
};

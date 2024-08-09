/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'primary': "#d67b88",
        'description': "#8e8e8e",
        'dropdown-text': "#606266",
        'topbar-text': "#4b4b4b",
        "topbar-insert-dropdown-text": "#333333",
        'home-border': "#eee"
      },
      boxShadow: {
        'menu-switcher': '0 1px 4px rgba(0,0,0,.04),0 4px 10px rgba(0,0,0,.08)',
      },
      fontFamily: {
        'mono': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      height: {
        'pdf-viewer': 'calc(100vh - 53px)',
      },
    },
  },
  plugins: [],
};

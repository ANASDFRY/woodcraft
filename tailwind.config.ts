import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'wood-pattern': "url('/wood-texture.jpg')",
      },
      colors: {
        wood: {
          light: '#e3d5ca',
          medium: '#d4a373',
          dark: '#7f5539',
          pattern: '#d4a373' // Fallback color
        },
        'white-coffee': '#F5F0E7',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;

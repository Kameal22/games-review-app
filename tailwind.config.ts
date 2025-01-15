import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBackground: "#141315",
        darkGreyBackground: "#1B1A1D",
        greyText: "#7B7B7D",
        customWhite: "#f8f7ff",
        lightGray: "#242328",
        lightGrayHover: '#3a383d',
      },
    },
  },
  plugins: [],
} satisfies Config;

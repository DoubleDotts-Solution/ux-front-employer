/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ApercuPro", "sans-serif"],
      },
    },
    colors: {
      primary: "#070707",
      white: "#FFFFFF",
      gray: "#4F4F4F",
      gray3: "#D0D0D0",
      gray2: "#CECECE",
      red: "#FF1900",
    },
    borderColor: {
      primary: "#070707",
      black: "#000000",
      gray: "#888888",
      gray2: "#EDEDEDED",
      gray3: "#626262",
      gray4: "#DFDFDF",
      gray5: "#C8C8C8",
      red: "#FF1900",
      gray6: "#4F4F4F",
      gray7: "#777777",
      gray8: "#666666",
    },
    backgroundColor: {
      black: "#070707",
      black2: "#2D2D2D",
      black3: "#202032",
      white: "#FFFFFF",
      gray5: "#C8C8C8",
      purple: "#DBC3FF",
      purple2: "#A2A3F3",
      yellow: "#FFEA81",
      yellow1: "#FFDC2F",
      yellow2: "#FFD400",
      lightChiku: "#F3F0EC",
      lightChiku2: "#F8F6F4",
      lightChiku3: "#FAF9F7",
      lightGray: "#FBFAF9",
      pink: "#FFAFEF",
      green: "#A3EDDC",
      cream: "#FFE6BD",
      lightGreen: "#DCF7E8",
      tomato: "#FF9AA2",
      lightYellow: "#F3F0EA",
      lightYellow2: "#FFFADF",
      lightYellow3: "#FFF4B7",
      lightPurple: "#F2EAFF",
      green2: "#00AC7B",
    },
    backgroundImage: {
      "gradientPurple-box":
        "linear-gradient(99.68deg, #876AAC -50.75%, #D9C1FD 98.84%)",
    },
    boxShadow: {
      shadow1: "4px 4px 0px 0px #070707",
      shadow2: "0px -2px 8px 0px #0707071A",
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "992px",
      // => @media (min-width: 992px) { ... }
      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }
      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
      big: "1440px",
      // => @media (min-width: 1440px) { ... }
      sBig: "1600px",
      // => @media (min-width: 1440px) { ... }
      xBig: "1920px",
      // => @media (min-width: 1920px) { ... }
    },
  },
  plugins: [require("tailwindcss-animate")],
};

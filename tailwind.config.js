module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#d8e3e7",
          light: "#147a91",
          lightDark: "#50c4d3",
        },
        secondary: {
          main: "#126e83",
          dark: "#1c424d",
          greyDark: "#132c33",
        },
      },
      screens: {
        xs: "370px",
        sm: "555px",
        md: "765px",
        lg:"850px"
      },
    },
  },
  plugins: [],
};

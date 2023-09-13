module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        50: "50%",
      },
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
        info: {
          main: "#78afcd",
          light: "#f3f3f3",
          dark: "#f2f2f2",
        },
        warning: {
          main: "#f27f21",
        },
        portfolioTheme: {
          primary: "#8d1c9a",
          secondary: "#d40000",
          textColor: "#666666",
          titleColor: "#1a1a1a",
          black: "#00000",
        },
        homeCareTheme: {
          primary: "rgba(5, 59, 123,1)",
          textColor: "#93959d",
          opacityBorder: "rgba(5, 59, 123,0.5)",
        },
        inputPlaceHolderColor: "#78afcd",
        companyFormFieldBorderColor: "#d7d7d7",
        theme01: "#8d1c9a",
        whiteSmoke: "#f5f5f5",
        grey: "#b2b2b2",
        redThemeTextColor: "#1a1a1a",
        redThemeGreyTextColor: "#666666",
        gadgetTheme: {
          primary: "#3baa96",
          secondary: "#f7fffe",
          text: "#666666",
          title: "#1a1a1a",
        },
      },
      screens: {
        xs: "320px",
        xsOne: "390px",
        sm: "555px",
        md: "765px",
        lg: "850px",
        xl: "1200px",
        xlOne: "1400px",
        xlTwo: "1600px",
        xlThree: "1700px",
      },
    },
  },
  plugins: [],
};

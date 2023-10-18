module.exports = {
  // corePlugins: {
  //   preflight: false,
  // },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        13: "52px",
        14: "56px",
        15: "60px",
        16: "64px",
        17: "68px",
        18: "72px",
        19: "76px",
        20: "80px",
        21: "84px",
        22: "88px",
        23: "92px",
        24: "96px",
        25: "100px",
        110: "110px",
        120: "120px",
        130: "130px",
        140: "140px",
        150: "150px",
        160: "160px",
        170: "170px",
        180: "180px",
        190: "190px",
        200: "200px",
        260: "260px",
      },
      zIndex: {
        "-10": "-10",
        "-20": "-20",
        "-30": "-30",
        "-40": "-40",
      },
      transitionDelay: {
        400: "400ms",
        600: "600ms",
      },
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
        gold: {
          primary: "#E04343",
          info: "#F3F5F8",
          secondary: "#ffe800",
          white: "#FBFBFB",
        },
        platinum: {
          white: "#ffffff",
          black: "#38424D",
          gray: "#FBFBFF",
          yellow: "#FDD446",
          "theme-color": "#F94F4F",
          "border-color": "#E8E8E8",
          "body-color": "#747E88",
          "heading-color": "#162447",
          shadow: "#9D6A6A",
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
        platinumSm: "540px",
        platinumMd: "720px",
        platinumLg: "960px",
        platinumXl: "1140px",
        platinum2xl: "1320px",
      },
    },
  },
  plugins: [],
};

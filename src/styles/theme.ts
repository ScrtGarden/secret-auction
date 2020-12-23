const base = {
  "borders": {
    "sm": "1px solid",
    "md": "3px solid"
  },
  "borderRadii": {
    "sm": "2px",
    "md": "4px"
  },
  "borderStyles": {
    "solid": "solid"
  },
  "borderWidths": {
    "sm": "1px",
    "md": "3px"
  },
  "breakpoints": {
    "xs": "0px",
    "sm": "576px",
    "md": "768px",
    "lg": "992px",
    "xl": "1200px"
  },
  "colors": {
    "base": "light",
    "background": "#fff",
    "foreground": "#2f3941",
    "primaryHue": "blue",
    "dangerHue": "red",
    "warningHue": "yellow",
    "successHue": "green",
    "neutralHue": "grey",
    "chromeHue": "kale"
  },
  "fontSizes": {
    // "xs": "1rem",
    // "sm": "1.2rem",
    // "md": "1.4rem",
    // "lg": "1.8rem",
    // "xl": "2.2rem",
    // "xxl": "2.6rem",
    // "xxxl": "3.6rem"
  },
  "fontWeights": {
    "thin": 100,
    "extralight": 200,
    "light": 300,
    "regular": 400,
    "medium": 500,
    "semibold": 600,
    "bold": 700,
    "extrabold": 800,
    "black": 900
  },
  "iconSizes": {
    "sm": "1.2rem",
    "md": "1.6rem",
    "lg": "2.6rem"
  },
  "lineHeights": {
    "sm": "16px",
    "md": "20px",
    "lg": "24px",
    "xl": "28px",
    "xxl": "32px",
    "xxxl": "44px"
  },
  "palette": { /* see API for details */ },
  "shadowWidths": {
    "sm": "2px",
    "md": "3px"
  },
  // "shadows": {
  //   "sm": "(e) => expression",
  //   "md": "(e) => expression",
  //   "lg": "(e,t,n) => expression"
  // },
  "space": {
    "base": 4,
    "xxs": "4px",
    "xs": "8px",
    "sm": "12px",
    "md": "20px",
    "lg": "32px",
    "xl": "40px",
    "xxl": "48px"
  }
}

const theme = {
  
  light: {
    ...base,
    "palette": {
      "black": "#000",
      "white": "#fff",
    }
  },
  dark: {
    ...base,
    //
  }
}

export default theme
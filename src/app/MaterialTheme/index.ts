import { createTheme } from "@mui/material/styles";
import { common } from "@mui/material/colors";
import shadow from "./shadow";
import typography from "./typography";
import { maxWidth } from "@mui/system";

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
  palette: {
    type: "light",
    background: {
      default: "#f8f8ff",
      paper: common.white,
    },
    primary: {
      contrastText: "#F5F5F5", // Light off-white for text on dark backgrounds
      main: "#2A3D45", // Slate blue for a modern primary color
    },
    secondary: {
      contrastText: "#2A3D45", // Tying it back to the primary color
      main: "#E5B181", // Muted peach for a warm, inviting accent
    },
    text: {
      primary: "#2A3D45", // Deep slate blue for text
      secondary: "#E5B181", // Muted peach for secondary text
      dark: "#1C1C1C", // Almost black, for better contrast
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: { background: "#f4f6f8", height: "100%", minHeight: "100%" },
      },
    },
  },
  shadow,
  typography,
};

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1300px",
          },
        },
      },
    },
  },
});

export default theme;

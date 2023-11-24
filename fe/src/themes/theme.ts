import {
  ComponentStyleConfig,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";
import { fonts } from "./config";
import { isWindowOs } from "@/utils";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};


const colors = {
  bg: {
    primary: "#000000",
    secondary: "#0E1E45",
  },
  color: {
    white: "#ffffff",
    primary: "#0047B8",
  },
};

const Text: ComponentStyleConfig = {
  variants: {
    "with-menu": {
      fontFamily: fonts.Mirza,
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "120%",
      color: "#FFEFD7",
      fontStyle: "normal",
      textAlign: 'center',      
    },
    "with-text": {
      fontFamily: fonts.Mirza,
      fontSize: "32px",
      fontWeight: "700",
      lineHeight: "120%",
      color: "#FFEFD7",
      fontStyle: "normal",     
      // paddingTop: `${!isWindowOs() ? 10 : 0}px`,
    },
    "with-text-400": {
      fontFamily: fonts.Mirza,
      fontSize: "32px",
      fontWeight: "400",
      lineHeight: "120%",
      color: "#FFEFD7",
      fontStyle: "normal",    
      // paddingTop: `${!isWindowOs() ? 10 : 0}px`, 
    },
    "with-actor": {
      fontSize: "16px",
      color: '#FFEFD7',
      fontWeight: 400,
      lineHeight: '120%',
      fontStyle: 'normal'

    }
  },
};

export const TextVariants = {  
  WITH_MENU: "with-menu", 
  WITH_TEXT: "with-text", 
  WITH_TEXT_400: "with-text-400", 
  WITH_ACTOR: "with-actor", 
}

const Button: ComponentStyleConfig = {
  variants: {
    "with-hl-blue-dark": {
      bgColor: "#194185",
      color: "#fff",
      minW: "160px",
      minH: "36px",
      justifyContent: "center",    
      alignItems: "center",
      fontFamily: fonts.Mirza,
      border: "1px solid #D0D5DD",
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      borderRadius: "6px",
      fontSize: "20px",
    },
  },
};

export const ButtonVariants = {
  WITH_HIGHLIGHT_BLUE_DARK: "with-hl-blue-dark",
}

const Input: ComponentStyleConfig = {
  variants: {},
};

const components = {
  Button,
  Text,
  Input,
};

const theme = extendTheme({
  config,
  colors,
  components,
});

export default theme;

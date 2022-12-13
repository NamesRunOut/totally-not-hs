import React from "react";
import { ThemeProvider } from "styled-components";

export const theme = {
    colors: {
        bg: "#282c34",
        font_light: "white",
        font_dark: "black",
        blu: "#61dafb",
        blu_dark: "#468CBEB2",
        red_pane: "#66838a",
        card_bg: "azure",
        card_atk: "indianred",
        card_hp: "lightgreen",
        card_mana: "dodgerblue"
    }
};

// @ts-ignore
const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
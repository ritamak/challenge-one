import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${(props) => (props.darkMode ? "black" : "white")};
    transition: all 0.50s linear;
  }
  `;

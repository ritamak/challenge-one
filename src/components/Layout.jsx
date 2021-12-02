import { useContext } from "react";
import Header from "./Header";
import styled from "styled-components";
import { ThemeContext } from "../store/ThemeContext";
import { createGlobalStyle } from "styled-components";

const ContentContainer = styled.section`
  background: ${(props) => (props.darkMode ? "#615849" : "#f3e5c8")};
  text-align: center;
  font-family: "Nunito", sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  width: 100%;
  transition: all 0.5s linear;
`;

const GlobalStyles = createGlobalStyle`
  body {
    background: ${(props) => (props.darkMode ? "#615849" : "#f3e5c8")};
    transition: all 0.50s linear;
  }
  `;

const Layout = ({ headerLink, headerText, children }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <>
      <GlobalStyles darkMode={darkMode} />
      <ContentContainer darkMode={darkMode}>
        <Header
          theme={theme}
          link={headerLink}
          text={headerText}
          darkMode={darkMode}
        />
        {children}
      </ContentContainer>
    </>
  );
};

export default Layout;

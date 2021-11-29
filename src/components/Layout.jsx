import React from "react";
import Header from "./Header";
import styled from "styled-components";

const ContentContainer = styled.section`
  background: #f3e5c8;
  text-align: center;
  font-family: "Nunito", sans-serif;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  width: 100%;
`;

const Layout = ({ headerLink, headerText, children }) => {
  return (
    <>
      <Header link={headerLink} text={headerText} />
      <ContentContainer>{children}</ContentContainer>
    </>
  );
};

export default Layout;

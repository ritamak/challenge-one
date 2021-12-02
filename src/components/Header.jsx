import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material/";
import styled from "styled-components";
import ButtonToggle from "../components/ButtonToggle";

const StyledTypography = styled(Typography)`
  font-size: 1em !important;
  font-family: "Nunito", sans-serif;
  text-align: end;
`;

const StyledLink = styled(Link)`
  color: ${(props) => (props.darkMode ? "white" : "#eeaf30")} !important;
  border: solid ${(props) => (props.darkMode ? "white" : "#eeaf30")} !important;
  text-decoration: none;
  padding: 10px;

  &:visited {
    color: ${(props) => (props.darkMode ? "white" : "#eeaf30")} !important;
  }

  &:hover {
    background: #eeaf30 !important;
    border: solid #eeaf30 !important;
    color: #0c1724 !important;
  }

  &:active {
    color: #eeaf30;
  }
`;

const StyledIconButton = styled(IconButton)`
  display: flex;
  transform: scale(1.3);
`;

const StyledAppbar = styled(AppBar)`
  background: ${(props) => (props.darkMode ? "#615849" : "#0c1724")} !important;
  position: absolute;
  top: 0;
  width: 100% !important;
`;

export default function Header({ text, link, darkMode }) {
  return (
    <StyledAppbar darkMode={darkMode}>
      <Toolbar>
        <StyledTypography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          <StyledLink darkMode={darkMode} to={link}>
            {text}
          </StyledLink>
        </StyledTypography>
        <StyledIconButton size="large" sx={{ mr: 2 }}>
          <ButtonToggle darkMode={darkMode} />
        </StyledIconButton>
      </Toolbar>
    </StyledAppbar>
  );
}

import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material/";
import styled from "styled-components";

const StyledTypography = styled(Typography)`
  font-size: 1em !important;
  font-family: "Nunito", sans-serif;
  text-align: end;
`;

const StyledLink = styled(Link)`
  color: #eeaf30 !important;
  border: solid #eeaf30 !important;
  text-decoration: none;
  padding: 10px;

  &:visited {
    color: #eeaf30 !important;
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

const StyledAppbar = styled(AppBar)`
  background: #0c1724 !important;
  position: absolute;
  top: 0;
  width: 100% !important;
`;

export default function Header({ text, link }) {
  return (
    <StyledAppbar>
      <Toolbar>
        <StyledTypography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          <StyledLink to={link}>{text}</StyledLink>
        </StyledTypography>
      </Toolbar>
    </StyledAppbar>
  );
}

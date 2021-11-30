import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material/";
import styled from "styled-components";

const StyledTypography = styled(Typography)`
  font-size: 1em !important;
  font-family: "Nunito", sans-serif;
  text-align: end;
`;

const StyledLink = styled(Link)`
  color: #eeaf30;
  text-decoration: none;
  border: solid #eeaf30;
  padding: 10px;

  &:visited {
    color: #eeaf30;
  }

  &:hover {
    background: #eeaf30;
    border: solid #0c1724;
    color: #0c1724;
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

import { useContext } from "react";
import { ThemeContext } from "../store/ThemeContext";
import styled, { css } from "styled-components";
import {
  WbSunnyOutlined,
  Brightness2Outlined,
} from "@mui/icons-material/WbSunnyOutlined";

const icon = css`
  color: ${(props) => (props.darkMode ? "white" : "#eeaf30")} !important;
  cursor: pointer;
`;

const StyledSun = styled(WbSunnyOutlined)`
  ${icon}
`;

const StyledMoon = styled(Brightness2Outlined)`
  ${icon}
`;

const StyledButton = styled.button`
  background: transparent;
  border: none;
  transition: 02s all linear;
  cursor: pointer;
  color: ${(props) => (props.darkMode ? "white" : "#eeaf30")} !important;
`;

const SwitchButton = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const onClick = () => {
    if (darkMode) {
      theme.dispatch({ type: "LIGHTMODE" });
    } else {
      theme.dispatch({ type: "DARKMODE" });
    }
  };

  return (
    <StyledButton onClick={onClick} darkMode={darkMode}>
      {darkMode ? (
        <StyledSun darkMode={darkMode} />
      ) : (
        <StyledMoon darkMode={darkMode} />
      )}
    </StyledButton>
  );
};

export default SwitchButton;

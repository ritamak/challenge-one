import { isPhone } from "../utils/utils";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Button, Typography } from "@mui/material";

const StyledButton = styled(Button)`
  width: 100%;
  text-decoration: none;
  border: none;
  text-transform: none;
  color: black;
  display: flex;
  justify-content: flex-start;
  :hover {
    background: transparent;
    cursor: default;
  }
  :active {
    background: transparent;
    cursor: default;
  }
`;

const StyledTypography = styled(Typography)`
  font-size: 1em !important;
  text-align: start;
  font-family: "Nunito", sans-serif;
  @media (min-width: 900px) {
    font-size: 1em !important;
    font-weight: bold;
  }
`;

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    width: 220,
    fontSize: theme.typography.pxToRem(20),
    border: "1px solid #dadde9",
  },
}));

const Post = ({ text, employees, arrayOfUsernames, arrayOfNumbers }) => {
  let myEmployeeUsername = "";
  let myEmployeePhone = "";
  let myEmployee;

  if (text) {
    if (isPhone(text.trim()) !== null) {
      arrayOfNumbers.map((number) => {
        if (text.search(number) >= 0) {
          myEmployeePhone = number;
        }
        return myEmployeePhone;
      });
    } else {
      arrayOfUsernames.map((username) => {
        if (text.search(username) >= 0) {
          myEmployeeUsername = username;
        }
        return myEmployeeUsername;
      });
    }
  }

  employees.map((employee) => {
    if (
      employee.username === myEmployeeUsername ||
      employee.phone === myEmployeePhone
    ) {
      myEmployee = employee;
    }
    return myEmployee;
  });

  return (
    <>
      {myEmployeeUsername && myEmployee && (
        <>
          <HtmlTooltip
            placement="bottom-start"
            title={
              <>
                <Typography>
                  <b>Name: </b>
                  {myEmployee?.name}
                </Typography>
                <Typography>
                  <b>Username: </b>
                  {myEmployee?.username}
                </Typography>
                <Typography>
                  <b>Phone: </b>
                  {myEmployee?.phone}
                </Typography>
                <Typography>
                  <b>Role: </b>
                  {myEmployee?.role}
                </Typography>
              </>
            }
          >
            <StyledButton>
              <StyledTypography>{text}</StyledTypography>
            </StyledButton>
          </HtmlTooltip>
        </>
      )}

      {myEmployeePhone && myEmployee && (
        <>
          <HtmlTooltip
            placement="bottom-start"
            title={
              <>
                <Typography>
                  <b>Name: </b>
                  {myEmployee?.name}
                </Typography>
                <Typography>
                  <b>Username: </b>
                  {myEmployee?.username}
                </Typography>
                <Typography>
                  <b>Phone: </b>
                  {myEmployee?.phone}
                </Typography>
                <Typography>
                  <b>Role: </b>
                  {myEmployee?.role}
                </Typography>
              </>
            }
          >
            <StyledButton>
              <StyledTypography>{text}</StyledTypography>
            </StyledButton>
          </HtmlTooltip>
        </>
      )}
      {!myEmployee && !myEmployeePhone && !myEmployeeUsername && (
        <StyledButton>
          <StyledTypography>{text}</StyledTypography>
        </StyledButton>
      )}
    </>
  );
};

export default Post;

/*
          <p>{text.replace(myEmployeePhone)}</p>



  if (text) {
    for (let i = 0; i < employees.length; i++) {
      if (
        Math.sign(text.search(employees[i].name) === 1) ||
        Math.sign(text.search(employees[i].name) === 0)
      ) {
        myEmployee.push(employees[i]);
        myEmployeeUsername = employees[i].name;
      }
    }
  }


*/

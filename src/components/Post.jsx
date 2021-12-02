import { hasPhone } from "../utils/utils";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Typography, Container } from "@mui/material";

const Wrapper = styled(Container)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
  font-size: 0.8em !important;
  text-align: start;
  font-weight: bold !important;
  font-family: "Nunito", sans-serif !important;
  margin-right: 4px;
  padding-left: 0px !important;
`;

const StyledTypographyUsername = styled(Typography)`
  font-size: 0.8em !important;
  text-align: start;
  font-weight: bold !important;
  font-family: "Nunito", sans-serif !important;
  margin-right: 10px;
  padding-left: 0px !important;
  color: #eeaf30;
  text-decoration: underline;
`;

const StyledTypographyEnd = styled(Typography)`
  font-size: 0.8em !important;
  text-align: start;
  font-weight: bold !important;
  font-family: "Nunito", sans-serif !important;
  margin-left: -6px !important;
  padding-left: 0px !important;
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

  let myName = arrayOfUsernames.filter((el) => text.includes(el));
  console.log(myName);

  if (text) {
    if (hasPhone(text.trim()) !== null) {
      arrayOfNumbers.map((number) => {
        if (text.search(number) >= 0) {
          myEmployeePhone = number;
        }
        return myEmployeePhone;
      });
    } else if ((hasPhone(text.trim()) !== null) & myName) {
      arrayOfUsernames.map((username) => {
        if (text.search(username) >= 0) {
          myEmployeeUsername = username;
        }
        return myEmployeeUsername;
      });
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

  let firstStringUsername = "";
  let secondStringUsername = "";
  let firstStringNumber = "";
  let secondStringNumber = "";
  let onlyStringUsername = "";
  let onlyStringNumber = "";

  let separated = text.split(" ");

  const checkName = (name) => {
    return name === myEmployeeUsername;
  };

  const checkNumber = (number) => {
    return number.toString() === myEmployeePhone.toString();
  };

  let indexName = separated.findIndex(checkName);
  let indexNumber = separated.findIndex(checkNumber);

  if (indexName > 0) {
    firstStringUsername = separated.slice(0, indexName).join(" ");
  } else if (indexName === 0) {
    onlyStringUsername = separated.slice(1, separated.length).join(" ");
  }

  if (indexNumber > 0) {
    firstStringNumber = separated.slice(0, indexNumber).join(" ");
  } else if (indexNumber === 0) {
    onlyStringNumber = separated.slice(1, separated.length).join(" ");
  }

  if (indexName > 0) {
    secondStringUsername = separated
      .slice(indexName + 1, separated.length)
      .join(" ");
  }

  if (indexNumber > 0) {
    secondStringNumber = separated
      .slice(indexNumber + 1, separated.length)
      .join(" ");
  }

  return (
    <>
      {myEmployeeUsername && myEmployee && (
        <Wrapper>
          {indexName !== 0 && firstStringUsername && (
            <StyledTypography>{firstStringUsername}</StyledTypography>
          )}
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
            {myEmployeeUsername ? (
              <StyledTypographyUsername>
                {myEmployee.username}
              </StyledTypographyUsername>
            ) : (
              <StyledTypography>{text}</StyledTypography>
            )}
          </HtmlTooltip>
          {indexName === 0 && onlyStringUsername && (
            <StyledTypographyEnd>{onlyStringUsername}</StyledTypographyEnd>
          )}
          {secondStringUsername && (
            <StyledTypographyEnd>{secondStringUsername}</StyledTypographyEnd>
          )}
        </Wrapper>
      )}

      {myEmployeePhone && myEmployee && (
        <Wrapper>
          {indexNumber !== 0 && firstStringNumber && (
            <StyledTypography>{firstStringNumber}</StyledTypography>
          )}
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
            {myEmployeePhone ? (
              <StyledTypographyUsername>
                {myEmployee.phone}
              </StyledTypographyUsername>
            ) : (
              <StyledTypography>{text}</StyledTypography>
            )}
          </HtmlTooltip>
          {indexNumber === 0 && onlyStringNumber && (
            <StyledTypographyEnd>{onlyStringNumber}</StyledTypographyEnd>
          )}
          {indexNumber !== 0 && secondStringNumber && (
            <StyledTypography>{secondStringNumber}</StyledTypography>
          )}
        </Wrapper>
      )}
      {!myEmployee && !myEmployeePhone && !myEmployeeUsername && (
        <Wrapper>
          <StyledTypography>{text}</StyledTypography>
        </Wrapper>
      )}
    </>
  );
};

export default Post;

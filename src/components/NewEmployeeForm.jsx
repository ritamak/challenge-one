import axios from "axios";
import { useState } from "react";
import useInput from "../hooks/use-input";
import styled from "styled-components";
import { Button, TextField, Container, Paper, Alert } from "@mui/material";
import { objToArray } from "../utils/utils";

const isNotEmpty = (value) => value.trim() !== "";
const isPhone = (value) => value.match(phoneRgx);
const isUsername = (value) => value.match(usernameRgx);

let phoneRgx = /^\d{9}$/;
const usernameRgx = /[\w-_]+/;

const StyledHeader = styled.h1`
  font-size: 1em;
  text-transform: capitalize;
`;

const ForStylingDiv = styled.div`
  height: 3em !important;
`;

const StyledAlert = styled(Alert)`
  margin: 0px !important;
  font-family: "Nunito", sans-serif !important;
  padding: 4px !important;
`;

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100% !important;
  background: #fcf9f3 !important;
  padding: 10px 20px 10px;
  margin-bottom: 40px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-family: "Nunito", sans-serif !important;
`;

const StyledButton = styled(Button)`
  background: #eeaf30 !important;
  color: white !important;
  margin-left: 20px !important;
`;

const StyledTextField = styled(TextField)`
  background: white;
  width: 100%;
  font-family: "Nunito", Sans-serif !important;
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
  margin-left: 15px;
`;

const TextFieldWrapper = styled(Container)`
  width: 100%;
`;

const NewEmployeeForm = ({ employees, setEmployees }) => {
  const [phoneIsDuplicated, setPhoneIsDuplicated] = useState(false);

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isUsername);
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);
  const {
    value: role,
    isValid: roleIsValid,
    hasError: roleHasError,
    valueChangeHandler: roleChangeHandler,
    inputBlurHandler: roleBlurHandler,
    reset: resetRole,
  } = useInput(isNotEmpty);
  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(isPhone);

  let formIsValid = false;

  if (usernameIsValid && nameIsValid && roleIsValid && phoneIsValid) {
    formIsValid = true;
  }

  const addNewEmployeeHandler = async (event) => {
    event.preventDefault();

    const { a, b, c, d } = event.target;

    let newEmployee = {
      username: a.value,
      name: b.value,
      role: c.value,
      phone: d.value,
    };

    if (!formIsValid) {
      return;
    }

    try {
      employees.map((employee) => {
        if (employee.phone === newEmployee.phone) {
          setPhoneIsDuplicated(true);
        }
        return phoneIsDuplicated;
      });

      if (phoneIsDuplicated) {
        return;
      } else {
        await axios
          .post(
            `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/employees.json`,
            newEmployee
          )
          .then(async () => {
            await axios
              .get(
                `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/employees.json`
              )
              .then(({ data }) => {
                const newEmployees = objToArray(data);
                setEmployees(newEmployees);
                resetName();
                resetPhone();
                resetRole();
                resetUsername();
                setPhoneIsDuplicated(false);
              });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <ContentContainer elevation={10}>
      <StyledHeader>New Employee Form</StyledHeader>
      <StyledForm autoComplete="off" onSubmit={addNewEmployeeHandler}>
        <TextFieldWrapper>
          <InputSection>
            <StyledTextField
              label="Username"
              color="warning"
              variant="outlined"
              name="a"
              id="a"
              size="small"
              autoComplete="a"
              value={username}
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
              required
            />
            <ForStylingDiv>
              {usernameHasError && (
                <StyledAlert icon={false} severity="error">
                  please enter an username
                </StyledAlert>
              )}
            </ForStylingDiv>
          </InputSection>

          <StyledTextField
            label="Name"
            color="warning"
            variant="outlined"
            value={name}
            name="b"
            size="small"
            id="b"
            autoComplete="b"
            required
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          <ForStylingDiv>
            {nameHasError && (
              <StyledAlert icon={false} severity="error">
                please enter a name
              </StyledAlert>
            )}
          </ForStylingDiv>
          <InputSection>
            <StyledTextField
              label="Role"
              value={role}
              color="warning"
              variant="outlined"
              size="small"
              name="c"
              id="c"
              autoComplete="c"
              required
              onChange={roleChangeHandler}
              onBlur={roleBlurHandler}
            />
            <ForStylingDiv>
              {roleHasError && (
                <StyledAlert icon={false} severity="error">
                  please enter a role
                </StyledAlert>
              )}
            </ForStylingDiv>
          </InputSection>
          <InputSection>
            <StyledTextField
              label="Phone"
              value={phone}
              color="warning"
              size="small"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              variant="outlined"
              name="d"
              id="d"
              autoComplete="d"
              required
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
            />
            <ForStylingDiv>
              {phoneHasError && (
                <StyledAlert icon={false} severity="error">
                  enter a valid phone number - ex: (911234567)
                </StyledAlert>
              )}
              {phoneIsDuplicated && (
                <StyledAlert icon={false} severity="error">
                  this phone number already exists
                </StyledAlert>
              )}
            </ForStylingDiv>
          </InputSection>
        </TextFieldWrapper>
        <ButtonWrapper>
          <StyledButton
            disabled={!formIsValid}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </StyledButton>
        </ButtonWrapper>
      </StyledForm>
    </ContentContainer>
  );
};

export default NewEmployeeForm;

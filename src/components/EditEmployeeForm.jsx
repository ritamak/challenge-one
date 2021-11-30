import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { objToArray, isNotEmpty, isPhone, isUsername } from "../utils/utils";
import useInput from "../hooks/use-input";
import Modal from "../UI/Modal";
import styled from "styled-components";
import { Button, TextField, Container, Alert } from "@mui/material";
import { Close } from "@mui/icons-material";

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

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledHeader = styled.h1`
  font-size: 1em;
  text-transform: capitalize;
`;

const CloseFormButtonWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StyledCloseButton = styled(Button)`
  border: none;
  background: transparent;
  padding: 0px !important;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  background: #eeaf30 !important;
  color: white !important;
`;

const StyledTextField = styled(TextField)`
  background: white;
  width: 100%;
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const TextFieldWrapper = styled(Container)`
  width: 100%;
`;

const EditEmployeeForm = ({
  employee,
  setEmployees,
  onCloseModal,
  setPosts,
  id,
}) => {
  const navigate = useNavigate();

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

  const editEmployeeHandler = async (event) => {
    event.preventDefault();
    const { a, b, c, d } = event.target;

    let updatedEmployee = {
      username: a.value,
      name: b.value,
      role: c.value,
      phone: d.value,
    };

    if (!formIsValid) {
      return;
    }

    try {
      await axios
        .get(
          `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json`
        )
        .then(({ data }) => {
          const myPosts = objToArray(data);

          const filteredPostWithName = myPosts.filter((el) =>
            el.text.includes(employee.name)
          );
          const filteredPostWithPhone = myPosts.filter((el) =>
            el.text.includes(employee.phone)
          );

          if (filteredPostWithName) {
            filteredPostWithName.map(async (post) => {
              return axios
                .patch(
                  `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${post.id}.json`,
                  {
                    text: post.text.replace(
                      employee.name,
                      updatedEmployee.name
                    ),
                  }
                )
                .then(async () => {
                  await axios
                    .get(
                      `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json`
                    )
                    .then(({ data }) => {
                      const newPosts = objToArray(data);
                      setPosts(newPosts);
                    });
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            });
          }

          if (filteredPostWithPhone) {
            filteredPostWithPhone.map(async (post) => {
              return axios
                .patch(
                  `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${post.id}.json`,
                  {
                    text: post.text.replace(
                      employee.phone,
                      updatedEmployee.phone
                    ),
                  }
                )
                .then(async () => {
                  await axios
                    .get(
                      `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json`
                    )
                    .then(({ data }) => {
                      const newPosts = objToArray(data);
                      setPosts(newPosts);
                    });
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            });
          }
        })
        .then(async () => {
          await axios.patch(
            `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/employees/${id}.json`,
            updatedEmployee
          );
        })

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
              navigate(`/`);
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!employee) {
    return <p>Loading...</p>;
  }
  return (
    <Modal employeeModal>
      {employee && (
        <StyledWrapper>
          <CloseFormButtonWrapper>
            <StyledCloseButton onClick={onCloseModal}>
              <Close />
            </StyledCloseButton>
          </CloseFormButtonWrapper>
          <StyledHeader>Edit employee</StyledHeader>
          <StyledForm onSubmit={editEmployeeHandler} autoComplete="off">
            <TextFieldWrapper>
              <InputSection>
                <StyledTextField
                  label={employee.username}
                  color="warning"
                  variant="outlined"
                  name="a"
                  id="a"
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
              <InputSection>
                <StyledTextField
                  label={employee.name}
                  color="warning"
                  variant="outlined"
                  name="b"
                  id="b"
                  autoComplete="b"
                  required
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  value={name}
                />
                <ForStylingDiv>
                  {nameHasError && (
                    <StyledAlert icon={false} severity="error">
                      please enter a name
                    </StyledAlert>
                  )}
                </ForStylingDiv>
              </InputSection>
              <InputSection>
                <StyledTextField
                  label={employee.role}
                  color="warning"
                  variant="outlined"
                  name="c"
                  id="c"
                  autoComplete="c"
                  required
                  onChange={roleChangeHandler}
                  onBlur={roleBlurHandler}
                  value={role}
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
                  label={employee.phone}
                  color="warning"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  variant="outlined"
                  name="d"
                  id="d"
                  value={phone}
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
        </StyledWrapper>
      )}
    </Modal>
  );
};

export default EditEmployeeForm;

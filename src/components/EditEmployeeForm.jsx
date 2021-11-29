import axios from "axios";
import styled from "styled-components";
import { Button, TextField, Container } from "@mui/material";
import { objToArray } from "../utils/utils";
import Modal from "../UI/Modal";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
  margin-bottom: 20px !important;
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
  onClose,
}) => {
  const navigate = useNavigate();

  const editEmployeeHandler = async (event) => {
    event.preventDefault();
    const { a, b, c, d } = event.target;

    let updatedEmployee = {
      username: a.value,
      name: b.value,
      role: c.value,
      phone: d.value,
    };

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
            `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/employees/${employee.id}.json`,
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
    <Modal>
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
              <StyledTextField
                label={employee.username}
                color="warning"
                variant="outlined"
                name="a"
                id="a"
                autoComplete="a"
              />
              <StyledTextField
                label={employee.name}
                color="warning"
                variant="outlined"
                name="b"
                id="b"
                autoComplete="b"
              />
              <StyledTextField
                label={employee.role}
                color="warning"
                variant="outlined"
                name="c"
                id="c"
                autoComplete="c"
              />
              <StyledTextField
                label={employee.phone}
                color="warning"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                variant="outlined"
                name="d"
                id="d"
                autoComplete="d"
              />
            </TextFieldWrapper>
            <ButtonWrapper>
              <StyledButton type="submit" variant="contained" color="primary">
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

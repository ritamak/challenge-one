import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { objToArray, isNotEmpty } from "../utils/utils";
import Modal from "../UI/Modal";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
import styled from "styled-components";
import { Button, Container, Alert } from "@mui/material";
import { Close } from "@mui/icons-material";

const ForStylingDiv = styled.div`
  height: 3em !important;
  width: 100%;
`;

const StyledAlert = styled(Alert)`
  margin: 0px !important;
  font-family: "Nunito", sans-serif !important;
  width: 95%;
`;

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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

const StyledTextField = styled(TextInput)`
  background: white;
  width: 100%;
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: center;
`;

const TextFieldWrapper = styled(Container)`
  width: 100%;
`;

const StyledHeader = styled.h1`
  font-size: 1em;
  text-transform: capitalize;
`;

const EditPostForm = ({
  arrayOfNumbers,
  arrayOfUsernames,
  onClose,
  onCloseModal,
  setPosts,
  id,
  myPost,
}) => {
  const [error, setError] = useState(false);

  const handleChange = () => {
    setError(false);
  };

  const navigate = useNavigate();

  const editPostHandler = async (event) => {
    event.preventDefault();

    let updatedPost = {
      text: event.target.text.value,
    };

    if (!isNotEmpty(updatedPost.text)) {
      setError(true);
      return;
    }

    try {
      await axios
        .patch(
          `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`,
          updatedPost
        )
        .then(async () => {
          await axios
            .get(
              `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json`
            )
            .then(({ data }) => {
              const newPosts = objToArray(data);
              setPosts(newPosts);
              navigate(`/`);
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  let enteredInputs = [];

  return (
    <Modal>
      {myPost && (
        <StyledWrapper>
          <CloseFormButtonWrapper>
            <StyledCloseButton onClick={onCloseModal}>
              <Close />
            </StyledCloseButton>
          </CloseFormButtonWrapper>
          <StyledHeader>Edit post</StyledHeader>
          <StyledForm onSubmit={editPostHandler} autoComplete="off">
            <TextFieldWrapper>
              <StyledTextField
                color="warning"
                variant="outlined"
                name="text"
                id="text"
                autoComplete="off"
                label={myPost.text}
                onChange={handleChange}
                trigger={["@", "#"]}
                changeOnSelect={(trigger, slug) => {
                  enteredInputs.push(slug);
                  return slug.trim();
                }}
                options={{ "@": arrayOfUsernames, "#": arrayOfNumbers }}
              />
              <ForStylingDiv>
                {error && (
                  <StyledAlert icon={false} severity="error">
                    please enter a valid post
                  </StyledAlert>
                )}
              </ForStylingDiv>
            </TextFieldWrapper>

            <ButtonWrapper>
              <StyledButton
                onClick={onClose}
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

export default EditPostForm;

import axios from "axios";
import styled from "styled-components";
import { Button, Paper } from "@mui/material";

import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
import { objToArray } from "../utils/utils";

const Wrapper = styled(Paper)`
  width: 80%;
  background: #fcf9f3 !important;
  padding: 20px;

  @media (min-width: 900px) {
    width: 20%;
    background: #fcf9f3 !important;
    padding: 20px;
    margin-top: 100px;
  }
`;

const StyledHeader = styled.h1`
  font-size: 1.5em;
  text-transform: capitalize;
  @media (min-width: 600px) {
    font-size: 2em;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  background: #eeaf30 !important;
  color: white !important;
  font-size: 0.6em !important;

  @media (min-width: 600px) {
    font-size: 0.8em !important;
  }
`;

const StyledTextField = styled(TextInput)`
  background: white;
  outline: none;
  width: 90%;
  font-size: 1em;
  min-height: 70px !important;
  font-family: "Nunito", Sans-serif;
  @media (min-width: 600px) {
    font-size: 1.4em;
    min-height: 200px !important;
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  width: 90%;
  justify-content: center;
  margin-top: 10px;
  @media (min-width: 600px) {
    justify-content: flex-start;
    margin-top: 0px;
  }
`;

const TextFieldWrapper = styled.section`
  width: 100%;
`;

const NewPostForm = ({
  posts,
  setPosts,
  arrayOfNames,
  arrayOfNumbers,
  employees,
  setIsAddingPost,
  startAddingPostHandler,
}) => {
  const submitFormHandler = async (event) => {
    event.preventDefault();
    const { enteredPost } = event.target;

    let newPost = {
      text: enteredPost.value,
    };
    try {
      await axios
        .post(
          `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json`,
          newPost
        )
        .then(async () => {
          await axios
            .get(
              `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json`
            )
            .then(({ data }) => {
              const newPosts = objToArray(data);
              setPosts(newPosts);
              setIsAddingPost(false);
              enteredPost.value = "";
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let enteredInputs = [];

  return (
    <>
      <Wrapper elevation={10}>
        <StyledHeader>new post</StyledHeader>
        <StyledForm autoComplete="off" onSubmit={submitFormHandler}>
          <TextFieldWrapper>
            <StyledTextField
              id="outlined-basic"
              label="add post"
              color="warning"
              name="enteredPost"
              fullWidth
              trigger={["@", "#"]}
              changeOnSelect={(trigger, slug) => {
                enteredInputs.push(slug);
                return slug.trim();
              }}
              options={{ "@": arrayOfNames, "#": arrayOfNumbers }}
            />
          </TextFieldWrapper>
          <ButtonWrapper>
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              onClick={startAddingPostHandler}
            >
              add
            </StyledButton>
          </ButtonWrapper>
        </StyledForm>
      </Wrapper>
    </>
  );
};

export default NewPostForm;

import { Link } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";
import styled from "styled-components";
import {
  Button,
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar,
  Paper,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ButtonsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const DescriptionWrapper = styled(Paper)`
  display: none;
  @media (min-width: 600px) {
    width: 80%;
    margin-top: 20px;
    margin-bottom: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    background: #eeaf30 !important;
    color: black !important;
  }
  @media (min-width: 900px) {
    margin-bottom: 60px;
    margin-top: 0px;
    width: 100%;
  }
`;

const StyledParagraphs = styled.p`
  padding: 0px;
  margin: 0px;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  @media (min-width: 900px) {
    width: 50%;
  }
`;

const StyledContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 80% !important;
  max-height: 600px !important;
  overflow-y: auto;
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #eeaf30;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #0c1724;
    border-radius: 10px;
  }

  margin-bottom: 20px;
  @media (min-width: 900px) {
    margin-bottom: 0px;
    width: 100% !important;
  }
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
  min-width: 20px !important;
  align-self: end;
  width: 10%;
`;

const StyledDeleteIcon = styled(Delete)`
  color: black !important;
`;

const StyledEditIcon = styled(Edit)`
  color: black !important;
`;

const StyledList = styled(List)`
  margin-top: 0px;
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8em;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  align-self: end;
  margin-right: 10px;

  &:link {
    text-decoration: none;
    color: black;
  }
  &:visited {
    text-decoration: none;
    color: black;
  }

  &:hover {
    text-decoration: none;
    color: black;
  }

  &:active {
    text-decoration: none;
    color: black;
  }
`;

const PostsList = ({
  posts,
  setPosts,
  employees,
  arrayOfNumbers,
  arrayOfUsernames,
}) => {
  const deletePostHandler = (postId) => {
    axios
      .delete(
        `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`
      )
      .then(() => {
        let updatedPosts = posts.filter((post) => {
          return post.id !== postId;
        });

        setPosts(updatedPosts);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  return (
    <Wrapper>
      {posts && (
        <DescriptionWrapper elevation={10}>
          <StyledParagraphs>
            hover over <b>phone numbers</b> or <b>username</b> to get details
          </StyledParagraphs>
        </DescriptionWrapper>
      )}
      <StyledContainer elevation={10}>
        <StyledList sx={{ width: "100%" }} elevation={10}>
          {posts.length ? (
            posts.map((post) => (
              <>
                <Divider variant="inset" component="li" />
                <StyledListItem alignItems="center">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <Post
                    text={post.text}
                    postId={post.id}
                    employees={employees}
                    arrayOfNumbers={arrayOfNumbers}
                    arrayOfUsernames={arrayOfUsernames}
                  />
                  <ButtonsWrapper>
                    <StyledLink to={`/posts/${post.id}`}>
                      <StyledEditIcon />
                    </StyledLink>

                    <StyledButton onClick={() => deletePostHandler(post.id)}>
                      <StyledDeleteIcon />
                    </StyledButton>
                  </ButtonsWrapper>
                </StyledListItem>
                <Divider variant="inset" component="li" />
              </>
            ))
          ) : (
            <p>
              <b>No posts to show</b>
            </p>
          )}
        </StyledList>
      </StyledContainer>
    </Wrapper>
  );
};

export default PostsList;

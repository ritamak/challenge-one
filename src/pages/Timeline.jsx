import { useEffect } from "react";
import axios from "axios";
import { objToArray } from "../utils/utils";
import Layout from "../components/Layout";
import NewPostForm from "../components/NewPostForm";
import PostsList from "../components/PostsList";
import styled from "styled-components";
import Divider from "@mui/material/Divider";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (min-width: 900px) {
    flex-direction: row;
    align-items: start;
    justify-content: space-evenly;
  }
`;

const StyledDivider = styled(Divider)`
  height: 40px !important;
  border-color: #eeaf30 !important;
  border-bottom-width: medium !important;
  align-self: center;
  border-left: none !important;
  border-right: none !important;
  width: 40%;
  align-self: center !important;
  display: block;
  margin-bottom: 20px !important;
  @media (min-width: 900px) {
    display: none;
  }
`;

const StyledDividerTwo = styled(Divider)`
  display: none;
  @media (min-width: 900px) {
    display: inline-block;
    border-color: #eeaf30 !important;
    border-right-width: medium !important;
  }
`;

const Timeline = ({
  open,
  onClose,
  onClickOpen,
  employees,
  isLoading,
  posts,
  setPosts,
  arrayOfUsernames,
  arrayOfNumbers,
  setIsLoading,
}) => {
  useEffect(() => {
    (async () => {
      try {
        await axios
          .get(
            `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json`
          )
          .then(({ data }) => {
            const arrayOfPosts = objToArray(data);
            setIsLoading(false);
            setPosts(arrayOfPosts);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (err) {
        console.error("Error:", err);
      }
    })();
  }, [setIsLoading, setPosts]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Layout headerLink="/admin" headerText="Admin">
      <Wrapper>
        <NewPostForm
          employees={employees}
          posts={posts}
          setPosts={setPosts}
          arrayOfUsernames={arrayOfUsernames}
          arrayOfNumbers={arrayOfNumbers}
        />
        <StyledDivider flexItem />
        <StyledDividerTwo flexItem orientation="vertical" />

        <PostsList
          arrayOfUsernames={arrayOfUsernames}
          arrayOfNumbers={arrayOfNumbers}
          open={open}
          onClose={onClose}
          setPosts={setPosts}
          employees={employees}
          posts={posts}
          onClickOpen={onClickOpen}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </Wrapper>
    </Layout>
  );
};

export default Timeline;

import React, { useState } from "react";
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
  height: 60px !important;
  border-color: #eeaf30 !important;
  border-bottom-width: medium !important;
  align-self: center;
  border-left: none !important;
  border-right: none !important;
  width: 40%;
  align-self: center !important;
  display: block;
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
  setIsLoading,
  arrayOfNames,
  arrayOfNumbers,
}) => {
  const [isAddingPost, setIsAddingPost] = useState(false);

  const startAddingPostHandler = (event) => {
    setIsAddingPost(true);
  };

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
          setIsAddingPost={setIsAddingPost}
          startAddingPostHandler={startAddingPostHandler}
          arrayOfNames={arrayOfNames}
          arrayOfNumbers={arrayOfNumbers}
        />
        <StyledDivider flexItem />
        <StyledDividerTwo flexItem orientation="vertical" />

        <PostsList
          arrayOfNames={arrayOfNames}
          arrayOfNumbers={arrayOfNumbers}
          open={open}
          onClose={onClose}
          setPosts={setPosts}
          employees={employees}
          posts={posts}
          onClickOpen={onClickOpen}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isAddingPost={isAddingPost}
        />
      </Wrapper>
    </Layout>
  );
};

export default Timeline;

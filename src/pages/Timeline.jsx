import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import NewPostForm from "../components/NewPostForm";
import PostsList from "../components/PostsList";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import { objToArray } from "../utils/utils";

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
}) => {
  const [isAddingPost, setIsAddingPost] = useState(false);

  const startAddingPostHandler = (event) => {
    setIsAddingPost(true);
  };

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

  let arrayOfNames = [];
  let arrayOfNumbers = [];

  employees.map((employee) => {
    arrayOfNames.push(employee.name);
    return arrayOfNames;
  });

  employees.map((employee) => {
    arrayOfNumbers.push(employee.phone);
    return arrayOfNumbers;
  });

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

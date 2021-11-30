import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditPostForm from "../components/EditPostForm";

const EditPost = ({
  arrayOfNames,
  arrayOfNumbers,
  setPosts,
  onClose,
  posts,
  onCloseModal,
}) => {
  const [myPost, setMyPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        await axios
          .get(
            `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`
          )
          .then(({ data }) => {
            setMyPost(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.err("Error", error);
      }
    })();
  }, [id]);

  return (
    <EditPostForm
      myPost={myPost}
      setPosts={setPosts}
      onClose={onClose}
      posts={posts}
      id={id}
      onCloseModal={onCloseModal}
      arrayOfNumbers={arrayOfNumbers}
      arrayOfNames={arrayOfNames}
    />
  );
};

export default EditPost;

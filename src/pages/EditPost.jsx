import { useEffect, useState } from "react";
import axios from "axios";
import EditPostForm from "../components/EditPostForm";
import { useParams } from "react-router-dom";

const EditPost = (props) => {
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
      setPosts={props.setPosts}
      onClose={props.onClose}
      posts={props.posts}
      id={id}
      onCloseModal={props.onCloseModal}
    />
  );
};

export default EditPost;

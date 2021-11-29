import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Timeline from "./pages/Timeline";
import Admin from "./pages/Admin";
import { objToArray } from "./utils/utils";
import EditPost from "./pages/EditPost";
import EditEmployee from "./pages/EditEmployee";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await axios
          .get(
            `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/employees.json`
          )
          .then(({ data }) => {
            const arrayOfEmployees = objToArray(data);
            setEmployees(arrayOfEmployees);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModal = () => {
    navigate("/");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Timeline
              onClose={handleClose}
              open={open}
              onClickOpen={handleClickOpen}
              employees={employees}
              setEmployees={setEmployees}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              posts={posts}
              setPosts={setPosts}
            />
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <Admin
              onClose={handleClose}
              posts={posts}
              setPosts={setPosts}
              open={open}
              onClickOpen={handleClickOpen}
              employees={employees}
              setEmployees={setEmployees}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          exact
          path="/posts/:id"
          element={
            <EditPost
              posts={posts}
              setPosts={setPosts}
              onClose={handleClose}
              open={open}
              onClickOpen={handleClickOpen}
              onCloseModal={handleCloseModal}
            />
          }
        />
        <Route
          exact
          path="/employees/:id"
          element={
            <EditEmployee
              setEmployees={setEmployees}
              onClose={handleClose}
              setPosts={setPosts}
              posts={posts}
              onCloseModal={handleCloseModal}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;

// validate usermail in form
// edit posts
// edit employees

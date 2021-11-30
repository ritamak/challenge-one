import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EditEmployeeForm from "../components/EditEmployeeForm";

const EditEmployee = ({ setEmployees, onClose, setPosts, onCloseModal }) => {
  const [myEmployee, setMyEmployee] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        await axios
          .get(
            `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/employees/${id}.json`
          )
          .then(({ data }) => {
            setMyEmployee(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, [id]);

  return (
    <EditEmployeeForm
      onClose={onClose}
      setPosts={setPosts}
      employee={myEmployee}
      setEmployees={setEmployees}
      id={id}
      onCloseModal={onCloseModal}
    />
  );
};

export default EditEmployee;

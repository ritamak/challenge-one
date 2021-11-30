import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditEmployeeForm from "../components/EditEmployeeForm";

const EditEmployee = ({
  setEmployees,
  employees,
  onClose,
  setPosts,
  onCloseModal,
}) => {
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
      employees={employees}
      onCloseModal={onCloseModal}
    />
  );
};

export default EditEmployee;

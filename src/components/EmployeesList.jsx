import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material/";
import { Delete, Edit } from "@mui/icons-material";

const StyledEditIcon = styled(Edit)`
  color: black !important;
`;

const StyledTableContainer = styled(TableContainer)`
  width: 100% !important;
  margin-bottom: 100px;
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
`;

const StyledTableHead = styled(TableHead)`
  font: "Nunito", Sans-serif !important;
  background: #eeaf30 !important;
`;

const StyledTableBody = styled(TableBody)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .css-apqrd9-MuiTableBody-root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const StyledTableCell = styled(TableCell)`
  color: black !important;
  font-weight: bold;
  font-family: "Nunito", sans-serif !important;
  font-size: 1em !important;
`;

const StyledButton = styled(Button)`
  color: black !important;
  border: none !important;
`;

const StyledLink = styled(Link)`
  color: black;
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

const EmployeesList = ({ employees, setEmployees }) => {
  const deleteEmployeeHandler = (employeeId) => {
    axios
      .delete(
        `https://project-three-413a1-default-rtdb.europe-west1.firebasedatabase.app/employees/${employeeId}.json`
      )
      .then(() => {
        let updatedEmployees = employees.filter((employee) => {
          return employee.id !== employeeId;
        });

        setEmployees(updatedEmployees);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {employees.length ? (
        <StyledTableContainer component={Paper} elevation={10}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledTableCell align="center">
                  <b>Name</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Username</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Phone</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Role</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Edit</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b>Delete</b>
                </StyledTableCell>
              </TableRow>
            </StyledTableHead>
            {employees.map((employee) => (
              <StyledTableBody>
                <StyledTableCell align="center">
                  {employee.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.username}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.phone}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.role}
                </StyledTableCell>
                <StyledTableCell align="center" employee={employee}>
                  <StyledLink to={`/employees/${employee.id}`}>
                    <StyledEditIcon />
                  </StyledLink>
                </StyledTableCell>
                <TableCell align="center" employee={employee}>
                  <StyledButton
                    onClick={() => deleteEmployeeHandler(employee.id)}
                  >
                    <Delete />
                  </StyledButton>
                </TableCell>
              </StyledTableBody>
            ))}
          </Table>
        </StyledTableContainer>
      ) : (
        <p>
          <b>No content to show.</b>
        </p>
      )}
    </>
  );
};

export default EmployeesList;

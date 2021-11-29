import axios from "axios";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const StyledHeader = styled.h1`
  font-size: 1.5em;
  text-transform: capitalize;
  @media (min-width: 600px) {
    font-size: 2em;
  }
`;

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
  font: "Nunito", Sans-serif;
  background: #eeaf30 !important;
`;

const StyledTableBody = styled(TableBody)`
  display: flex;
  flex-direction: column;
`;

const StyledTableCell = styled(TableCell)`
  color: black !important;
  font-weight: bold;
  padding: 5px !important;
`;

const StyledButton = styled(Button)`
  color: black !important;
  padding: 0px !important;
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
      <StyledHeader>Employees</StyledHeader>
      {employees && (
        <StyledTableContainer component={Paper} elevation={10}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledTableCell align="center">Name </StyledTableCell>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">Phone</StyledTableCell>
                <StyledTableCell align="center">Role</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
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
                <StyledButton
                  onClick={() => deleteEmployeeHandler(employee.id)}
                >
                  <TableCell align="center" employee={employee}>
                    <Delete />
                  </TableCell>
                </StyledButton>
              </StyledTableBody>
            ))}
          </Table>
        </StyledTableContainer>
      )}
    </>
  );
};

export default EmployeesList;

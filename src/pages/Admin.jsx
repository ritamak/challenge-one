import Layout from "../components/Layout";
import NewEmployeeForm from "../components/NewEmployeeForm";
import EmployeesList from "../components/EmployeesList";
import styled from "styled-components";
import Divider from "@mui/material/Divider";

const StyledDivider = styled(Divider)`
  height: 40px !important;
  border-color: #eeaf30 !important;
  border-bottom-width: medium !important;
  align-self: center;
  border-left: none !important;
  border-right: none !important;
  width: 60%;
  align-self: center !important;
  margin-bottom: 20px !important;
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: "Nunito", sans-serif;
  width: 100%;
  flex-direction: column;
`;

const FormWrapper = styled.section`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const EmployeesWrapper = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Admin = ({
  onClickOpen,
  onClose,
  open,
  employees,
  setEmployees,
  isLoading,
  posts,
  setPosts,
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Layout headerLink="/" headerText="Home">
      <ContentWrapper>
        <FormWrapper>
          <NewEmployeeForm employees={employees} setEmployees={setEmployees} />
        </FormWrapper>
        <StyledDivider orientation="vertical" variant="fullWidth" flexItem />
        <EmployeesWrapper>
          <EmployeesList
            onClickOpen={onClickOpen}
            onClose={onClose}
            employees={employees}
            setEmployees={setEmployees}
            open={open}
            posts={posts}
            setPosts={setPosts}
          />
        </EmployeesWrapper>
      </ContentWrapper>
    </Layout>
  );
};

export default Admin;

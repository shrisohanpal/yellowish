import React from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTrash, FaEdit, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const navigate = useNavigate();

  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createUser, { isLoading: loadingCreate }] = useCreateUserMutation();

  const createUserHandler = async () => {
    if (window.confirm("Are you sure you want to create a new user?")) {
      try {
        const result = await createUser().unwrap();
        navigate(`/admin/user/${result._id}/edit`);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createUserHandler}>
            <FaPlus /> Create User
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>S NO</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>USERNAME</th>
              <th>ADDRESS</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.userName}</td>
                <td>{user.address}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/user/${user._id}/edit`}
                    style={{ marginRight: "10px" }}
                    variant="light"
                    className="btn-sm"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;

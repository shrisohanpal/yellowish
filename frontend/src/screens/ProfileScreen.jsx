import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Button,
  Row,
  Col,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetMyBooksQuery } from "../slices/booksApiSlice";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUsername] = useState("");
  const [address, setAddress] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useGetMyBooksQuery(1);

  useEffect(() => {
    //console.log(userInfo);
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setUsername(userInfo.userName);
    setAddress(userInfo.address);
  }, [
    userInfo.firstName,
    userInfo.lastName,
    userInfo.email,
    userInfo.phone,
    userInfo.userName,
    userInfo.address,
  ]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>First Name:</Col>
                <Col>
                  <strong>{firstName}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Last Name:</Col>
                <Col>
                  <strong>{lastName}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Email:</Col>
                <Col>
                  <strong>{email}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Phone:</Col>
                <Col>
                  <strong>{phone}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Username:</Col>
                <Col>
                  <strong>{userName}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Address:</Col>
                <Col>
                  <strong>{address}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md={9}>
        <h2>My Books</h2>
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
                <th>S_NO</th>
                <th>Title</th>
                <th>Selling Price</th>{" "}
                {/** 
                <th>Printing Cost</th>
                <th>Packaging Cost</th>
                <th>Handling Cost</th>

                <th>Amazon Platform Fee</th> */}
                <th>Amazon Royalty</th>{" "}
                {/** 
                <th>Amazon Url</th>
                <th>Flipkart Platform Fee</th> */}
                <th>Flipkart Royalty</th>{" "}
                {/**
                <th>Flipkart Url</th>
                <th>Kindle Platform Fee</th>  */}
                <th>Kindle Royalty</th>{" "}
                {/**
                <th>Kindle Url</th>  */}
              </tr>
            </thead>
            <tbody>
              {data.books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.sellingPrice}</td>{" "}
                  {/** 
                  <td>{book.printingCost}</td>
                  <td>{book.packagingCost}</td>
                  <td>{book.handlingCost}</td>
                  <td>{book.amazonPlatformFee}</td> */}
                  <td>{book.amazonRoyalty}</td>{" "}
                  {/** 
                  <td>{book.amazonUrl}</td> 
                  <td>{book.flipkartPlatformFee}</td> */}
                  <td>{book.flipkartRoyalty}</td>{" "}
                  {/** 
                  <td>{book.flipkartUrl}</td>
                  <td>{book.kindlePlatformFee}</td> */}
                  <td>{book.kindleRoyalty}</td>{" "}
                  {/* 
                  <td>{book.kindleUrl}</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;

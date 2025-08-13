import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../slices/ordersApiSlice";
import { useGetAllBooksQuery } from "../../slices/booksApiSlice";

const OrderEditScreen = () => {
  const { id: orderId } = useParams();

  const [book, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderPlatform, setOrderPlatform] = useState("");
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [platformRoyalty, setPlatformRoyalty] = useState(0);
  const [numberofOrders, setNumberofOrders] = useState(1);

  const {
    data: order,
    isLoading,
    refetch,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [updateOrder, { isLoading: loadingUpdate }] = useUpdateOrderMutation();

  const navigate = useNavigate();

  const {
    data: books,
    isLoading: booksLoading,
    error: booksError,
  } = useGetAllBooksQuery();

  const submitHandler = async (e) => {
    e.preventDefault();

    const selectedBook = books.find((b) => b._id === book);
    try {
      await updateOrder({
        orderId,
        book,
        author: selectedBook.author,
        orderPrice,
        orderStatus,
        paymentStatus,
        orderPlatform,
        deliveryCharges,
        platformRoyalty,
        numberofOrders,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Order updated");
      refetch();
      navigate("/admin/orderlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (order) {
      setBook(order.book || "");
      setAuthor(order.author || "");
      setOrderPrice(order.orderPrice || 0);
      setOrderStatus(order.orderStatus || "");
      setPaymentStatus(order.paymentStatus || "");
      setOrderPlatform(order.orderPlatform || "");
      setDeliveryCharges(order.deliveryCharges || 0);
      setPlatformRoyalty(order.platformRoyalty || 0);
      setNumberofOrders(order.numberofOrders || 0);
    }
  }, [order]);

  return (
    <>
      <Link to="/admin/orderlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Order</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {!booksLoading && !booksError && (
              <Form.Group controlId="book">
                <Form.Label>Book</Form.Label>
                <Form.Control
                  as="select"
                  value={book}
                  onChange={(e) => setBook(e.target.value)}
                >
                  <option value="">Select Book</option>
                  {books.map((book) => (
                    <option key={book._id} value={book._id}>
                      {book.title}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

            <Form.Group controlId="orderprice">
              <Form.Label>Order Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Order Price"
                value={orderPrice}
                onChange={(e) => setOrderPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="orderstatus">
              <Form.Label>Order Status</Form.Label>
              <Form.Control
                as="select"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="">Select Order Status</option>
                <option value="PreOrder">Pre Order</option>
                <option value="Completed">Completed</option>
                <option value="Returned">Returned</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="paymentstatus">
              <Form.Label>Payment Status</Form.Label>
              <Form.Control
                as="select"
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option value="">Select Payment Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="orderplatform">
              <Form.Label>Order Platform</Form.Label>
              <Form.Control
                as="select"
                value={orderPlatform}
                onChange={(e) => setOrderPlatform(e.target.value)}
              >
                {" "}
                <option value="">Select Order Platform</option>
                <option value="Amazon">Amazon</option>
                <option value="Flipkart">Flipkart</option>
                <option value="Kindle">Kindle</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="deliverycharges">
              <Form.Label>Delivery Charges</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Delivery Charges"
                value={deliveryCharges}
                onChange={(e) => setDeliveryCharges(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="platformroyalty">
              <Form.Label>Platform Royalty</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Platform Royalty"
                value={platformRoyalty}
                onChange={(e) => setPlatformRoyalty(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="numberoforders">
              <Form.Label>Number of Orders</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Number of Orders"
                value={numberofOrders}
                onChange={(e) => setNumberofOrders(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default OrderEditScreen;

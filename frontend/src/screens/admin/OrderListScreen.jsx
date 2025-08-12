import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useCreateOrderMutation,
} from "../../slices/ordersApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderListScreen = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  // const { pageNumber } = useParams();
  const navigate = useNavigate();

  const [deleteOrder, { isLoading: loadingDelete }] = useDeleteOrderMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteOrder(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createOrder, { isLoading: loadingCreate }] = useCreateOrderMutation();

  const createOrderHandler = async () => {
    if (window.confirm("Are you sure you want to create a new book?")) {
      try {
        const result = await createOrder().unwrap();
        navigate(`/admin/order/${result._id}/edit`);
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
          <h1>Orders</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createOrderHandler}>
            <FaPlus /> Create Order
          </Button>
        </Col>
      </Row>

      {/*loadingCreate && <Loader />}
      {loadingDelete && <Loader />*/}
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
              <th>S No</th>
              <th>Book Name</th>
              <th>Order Price</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Order Platform</th>
              <th>Delivery Charges</th>
              <th>Platform Royalty</th>
              <th>Order Date</th>
              <th>No of Orders</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.bookName}</td>
                <td>{order.orderPrice}</td>
                <td>{order.orderStatus}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.orderPlatform}</td>
                <td>{order.deliveryCharges}</td>
                <td>{order.platformRoyalty}</td>
                <td>{order.createdAt}</td>
                <td>{order.numberofOrders}</td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/order/${order._id}/edit`}
                    variant="light"
                    className="btn-sm mx-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(order._id)}
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

export default OrderListScreen;

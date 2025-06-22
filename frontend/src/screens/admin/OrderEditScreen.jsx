import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from '../../slices/ordersApiSlice';

const OrderEditScreen = () => {
  const { id: orderId } = useParams();

  const [bookName, setBookName] = useState('');
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderPlatform, setOrderPlatform] = useState('');
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [platformRoyalty, setPlatformRoyalty] = useState(0);
  const [numberofOrders, setNumberofOrders] = useState(0);

  const {
    data: order,
    isLoading,
    refetch,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [updateOrder, { isLoading: loadingUpdate }] =
    useUpdateOrderMutation();
 

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateOrder({
        orderId,
        bookName,
        orderPrice,
        orderStatus,
        paymentStatus,
        orderPlatform,
        deliveryCharges,
        platformRoyalty,
        numberofOrders
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Order updated');
      refetch();
      navigate('/admin/orderlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (order) {
      setBookName(order.bookName);
      setOrderPrice(order.orderPrice);
      setOrderStatus(order.orderStatus);
      setPaymentStatus(order.paymentStatus);
      setOrderPlatform(order.orderPlatform);
      setDeliveryCharges(order.deliveryCharges);
      setPlatformRoyalty(order.platformRoyalty);
      setNumberofOrders(order.numberofOrders);
    }
  }, [order]);


  return (
    <>
      <Link to='/admin/orderlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Order</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='bookname'>
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Book Name'
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='orderprice'>
              <Form.Label>Order Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Order Price'
                value={orderPrice}
                onChange={(e) => setOrderPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='orderstatus'>
              <Form.Label>Order Status</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Order Status'
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='paymentstatus'>
              <Form.Label>Payment Status</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Payment Status'
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='orderplatform'>
              <Form.Label>Order Platform</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Order Platform'
                value={orderPlatform}
                onChange={(e) => setOrderPlatform(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='deliverycharges'>
              <Form.Label>Delivery Charges</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Delivery Charges'
                value={deliveryCharges}
                onChange={(e) => setDeliveryCharges(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='platformroyalty'>
              <Form.Label>Platform Royalty</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Platform Royalty'
                value={platformRoyalty}
                onChange={(e) => setPlatformRoyalty(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='numberoforders'>
              <Form.Label>Number of Orders</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Number of Orders'
                value={numberofOrders}
                onChange={(e) => setNumberofOrders(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
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
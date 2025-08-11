import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
  useCreateBookMutation,
} from "../../slices/booksApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookListScreen = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetBooksQuery({
    pageNumber,
  });

  const [deleteBook, { isLoading: loadingDelete }] = useDeleteBookMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteBook(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createBook, { isLoading: loadingCreate }] = useCreateBookMutation();

  const createBookHandler = async () => {
    if (window.confirm("Are you sure you want to create a new book?")) {
      try {
        const result = await createBook().unwrap();
        //console.log(result._id);
        navigate(`/admin/book/${result._id}/edit`);
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
          <h1>Books</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createBookHandler}>
            <FaPlus /> Create Book
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>S NO</th>
                <th>Title</th>
                <th>Author</th>
                <th>Selling Price</th>
                <th>Printing Cost</th>
                <th>Packaging Cost</th>
                <th>Handling Cost</th>

                <th>Amazon Platform Fee</th>
                <th>Amazon Royalty</th>
                <th>Amazon Url</th>

                <th>Flipkart Platform Fee</th>
                <th>Flipkart Royalty</th>
                <th>Flipkart Url</th>

                <th>Kindle Platform Fee</th>
                <th>Kindle Royalty</th>
                <th>Kindle Url</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.sellingPrice}</td>
                  <td>{book.printingCost}</td>
                  <td>{book.packagingCost}</td>
                  <td>{book.handlingCost}</td>
                  <td>{book.amazonPlatformFee}</td>
                  <td>{book.amazonRoyalty}</td>
                  <td>{book.amazonUrl}</td>
                  <td>{book.flipkartPlatformFee}</td>
                  <td>{book.flipkartRoyalty}</td>
                  <td>{book.flipkartUrl}</td>
                  <td>{book.kindlePlatformFee}</td>
                  <td>{book.kindleRoyalty}</td>
                  <td>{book.kindleUrl}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/book/${book._id}/edit`}
                      variant="light"
                      className="btn-sm mx-2"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(book._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default BookListScreen;

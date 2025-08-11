import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useGetBookDetailsQuery,
  useUpdateBookMutation,
  useUploadBookImageMutation,
} from "../../slices/booksApiSlice";

const BookEditScreen = () => {
  const { id: bookId } = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [printingCost, setPrintingCost] = useState(0);
  const [packagingCost, setPackagingCost] = useState(0);
  const [handlingCost, setHandlingCost] = useState(0);

  const [amazonPlatformFee, setAmazonPlatformFee] = useState(0);
  const [amazonRoyalty, setAmazonRoyalty] = useState(0);
  const [amazonUrl, setAmazonUrl] = useState("");

  const [flipkartPlatformFee, setFlipkartPlatformFee] = useState(0);
  const [flipkartRoyalty, setFlipkartRoyalty] = useState(0);
  const [flipkartUrl, setFlipkartUrl] = useState("");

  const [kindlePlatformFee, setKindlePlatformFee] = useState(0);
  const [kindleRoyalty, setKindleRoyalty] = useState(0);
  const [kindleUrl, setKindleUrl] = useState("");

  const {
    data: book,
    isLoading,
    refetch,
    error,
  } = useGetBookDetailsQuery(bookId);

  const [updateBook, { isLoading: loadingUpdate }] = useUpdateBookMutation();

  const [uploadBookImage, { isLoading: loadingUpload }] =
    useUploadBookImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateBook({
        bookId,
        title,
        author,
        sellingPrice,
        printingCost,
        packagingCost,
        handlingCost,
        amazonPlatformFee,
        amazonRoyalty,
        amazonUrl,
        flipkartPlatformFee,
        flipkartRoyalty,
        flipkartUrl,
        kindlePlatformFee,
        kindleRoyalty,
        kindleUrl,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Book updated");
      refetch();
      navigate("/admin/booklist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setImage(book.image || "");
      setSellingPrice(book.sellingPrice ?? 0);
      setPrintingCost(book.printingCost ?? 0);
      setPackagingCost(book.packagingCost ?? 0);
      setHandlingCost(book.handlingCost ?? 0);
      setAmazonPlatformFee(book.amazonPlatformFee ?? 0);
      setAmazonRoyalty(book.amazonRoyalty ?? 0);
      setAmazonUrl(book.amazonUrl || "");
      setFlipkartPlatformFee(book.flipkartPlatformFee ?? 0);
      setFlipkartRoyalty(book.flipkartRoyalty ?? 0);
      setFlipkartUrl(book.flipkartUrl || "");
      setKindlePlatformFee(book.kindlePlatformFee ?? 0);
      setKindleRoyalty(book.kindleRoyalty ?? 0);
      setKindleUrl(book.kindleUrl || "");
    }
  }, [book]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadBookImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/booklist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Book</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Author Id"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label="Choose File"
                onChange={uploadFileHandler}
                type="file"
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId="sellingPrice">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Selling Price"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="printingCost">
              <Form.Label>Printing Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Printing Cost"
                value={printingCost}
                onChange={(e) => setPrintingCost(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="packagingCost">
              <Form.Label>packaging Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Packaging Cost"
                value={packagingCost}
                onChange={(e) => setPackagingCost(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="handlingCost">
              <Form.Label>Handling Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Handling Cost"
                value={handlingCost}
                onChange={(e) => setHandlingCost(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="amazonPlatformFee">
              <Form.Label>Amazon Platform Fee</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amazon Platform Fee"
                value={amazonPlatformFee}
                onChange={(e) => setAmazonPlatformFee(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="amazonRoyalty">
              <Form.Label>Amazon Royalty</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amazon Royalty"
                value={amazonRoyalty}
                onChange={(e) => setAmazonRoyalty(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="amazonUrl">
              <Form.Label>Amazon Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Amazon Url"
                value={amazonUrl}
                onChange={(e) => setAmazonUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="flipkartPlatformFee">
              <Form.Label>Flipkart Platform Fee</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Flipkart Platform Fee"
                value={flipkartPlatformFee}
                onChange={(e) => setFlipkartPlatformFee(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="flipkartRoyalty">
              <Form.Label>Flipkart Royalty</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Flipkart Royalty"
                value={flipkartRoyalty}
                onChange={(e) => setFlipkartRoyalty(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="flipkartUrl">
              <Form.Label>Flipkart Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Flipkart Url"
                value={flipkartUrl}
                onChange={(e) => setFlipkartUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="kindlePlatformFee">
              <Form.Label>Kindle Platform Fee</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Kindle Platform Fee"
                value={kindlePlatformFee}
                onChange={(e) => setKindlePlatformFee(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="kindleRoyalty">
              <Form.Label>Kindle Royalty</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Kindle Royalty"
                value={kindleRoyalty}
                onChange={(e) => setKindleRoyalty(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="kindleUrl">
              <Form.Label>Kindle Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Kindle Url"
                value={kindleUrl}
                onChange={(e) => setKindleUrl(e.target.value)}
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

export default BookEditScreen;

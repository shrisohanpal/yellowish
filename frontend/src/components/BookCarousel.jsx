import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopBooksQuery } from '../slices/booksApiSlice';

const BookCarousel = () => {
  const { data: books, isLoading, error } = useGetTopBooksQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {books.map((book) => (
        <Carousel.Item key={book._id}>
          <Link to={`/book/${book._id}`}>
            <Image src={book.image} alt={book.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {book.name} (${book.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BookCarousel;

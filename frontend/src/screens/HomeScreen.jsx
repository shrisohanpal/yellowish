import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo ? (
        <>
          <Row>
            <Col>
              <Card>
                <Row>
                  <Col>
                    <ListGroup>
                      <ListGroup.Item>
                        <strong>Total Books</strong>
                      </ListGroup.Item>
                      <ListGroup.Item>345</ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col>
                    <ListGroup>
                      <ListGroup.Item>
                        <strong>Total Books</strong>
                      </ListGroup.Item>
                      <ListGroup.Item>345</ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card>sfd</Card>
            </Col>
            <Col>
              <Card>sfd</Card>
            </Col>
            <Col>
              <Card>sfd</Card>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div style={{ height: "40px" }} />
          <img src="/home.png" style={{ width: "100%", height: "auto" }} />
        </>
      )}
    </>
  );
};

export default HomeScreen;

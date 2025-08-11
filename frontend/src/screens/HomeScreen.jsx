import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo ? (
        <>
          <div style={{ height: 40 }}></div>
          <Row>
            <Col>
              <Card>
                <Row>
                  <Col>
                    <ListGroup>
                      <ListGroup.Item>
                        <h2>
                          <strong>Total Books</strong>
                        </h2>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h2>345</h2>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col>
              <Card>
                <Row>
                  <Col>
                    <ListGroup>
                      <ListGroup.Item>
                        <h2>
                          <strong>Total Users</strong>
                        </h2>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h2>143</h2>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col>
              <Card>
                <Row>
                  <Col>
                    <ListGroup>
                      <ListGroup.Item>
                        <h2>
                          <strong>Total Orders</strong>
                        </h2>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h2>120</h2>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <div style={{ height: 80 }}></div>
          <Row>
            <Col>
              <Card>
                <Row>
                  <Col>
                    <ListGroup>
                      <ListGroup.Item>
                        <h2>
                          <strong>Amazon Orders</strong>
                        </h2>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h2>35</h2>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col>
              <Card>
                <Row>
                  <Col>
                    <ListGroup>
                      <ListGroup.Item>
                        <h2>
                          <strong>Flipkart Orders</strong>
                        </h2>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h2>40</h2>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col>
              <Card>
                <Row>
                  <Col>
                    <ListGroup>
                      <ListGroup.Item>
                        <h2>
                          <strong>Kindle Orders</strong>
                        </h2>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h2>45</h2>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card>
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

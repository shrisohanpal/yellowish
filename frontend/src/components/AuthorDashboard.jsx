import { useEffect, useState } from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { useGetAuthorDashboardDetailsQuery } from "../slices/dashboardApiSlice";
import Loader from "./Loader";

const AuthorDashboard = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRoyalty, setTotalRoyalty] = useState(0);
  const [amazonOrders, setAmazonOrders] = useState(0);
  const [flipkartOrders, setFlipkartOrders] = useState(0);
  const [kindleOrders, setKindleOrders] = useState(0);

  const {
    data: dashboardData,
    isLoading,
    error,
  } = useGetAuthorDashboardDetailsQuery();

  useEffect(() => {
    if (dashboardData) {
      setTotalBooks(dashboardData.totalBooks);
      setTotalOrders(dashboardData.totalOrders);
      setTotalRoyalty(dashboardData.totalRoyalty);
      setAmazonOrders(dashboardData.amazonOrders);
      setFlipkartOrders(dashboardData.flipkartOrders);
      setKindleOrders(dashboardData.kindleOrders);
    }
  }, [dashboardData]);

  return (
    <>
      <div style={{ height: 40 }}></div>
      {isLoading ? (
        <Loader />
      ) : (
        <Row>
          <Col sm={12} md={6} lg={4} xl={4} className="my-3">
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
                      <h2>{totalBooks}</h2>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={4} className="my-3">
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
                      <h2>{totalOrders}</h2>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4} xl={4} className="my-3">
            <Card>
              <Row>
                <Col>
                  <ListGroup>
                    <ListGroup.Item>
                      <h2>
                        <strong> Royalty</strong>
                      </h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h2>₹{totalRoyalty}</h2>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4} xl={4} className="my-3">
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
                      <h2>{amazonOrders}</h2>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4} xl={4} className="my-3">
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
                      <h2>{flipkartOrders}</h2>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4} xl={4} className="my-3">
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
                      <h2>{kindleOrders}</h2>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AuthorDashboard;

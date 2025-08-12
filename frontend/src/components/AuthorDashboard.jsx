import { useEffect, useState } from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { useGetAuthorDashboardDetailsQuery } from "../slices/dashboardApiSlice";

const AuthorDashboard = () => {
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
      <Row>
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
                    <h2>{totalOrders}</h2>
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
                      <strong>Total Royalty</strong>
                    </h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>{totalRoyalty}</h2>
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
                    <h2>{amazonOrders}</h2>
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
                    <h2>{flipkartOrders}</h2>
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
                    <h2>{kindleOrders}</h2>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AuthorDashboard;

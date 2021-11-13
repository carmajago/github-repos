import { Row, Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    <Row className="mt-5">
    
      <Spinner
        className="text-center"
        animation="border"
        variant="primary"
        style={{ width: "4rem", height: "4rem", margin:'0 auto'}}
      />
      <h4 className="text-center">loading..</h4>
  </Row>
  );
};

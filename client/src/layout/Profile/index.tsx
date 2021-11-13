import moment from "moment";
import { Container, Row ,Card, Col} from "react-bootstrap"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const Profile = () => {


  const user = useSelector((store: RootState) => {
    return store.auth;
  });


  return (
    <Container>
    <Row className="d-flex justify-content-center pt-5">
      <Col xs={12} sm={8} md={4}>
        <Card>
          <Card.Body>
       
            <h3 className="title text-center pb-4 ">Profile</h3>
                   
                   <h5 className="text-center">{user["user"]["first_name"]} {user["user"]["last_name"]}</h5>
                   <h5 className="text-center">{user["user"]["email"]}</h5>
                   <p className="text-center">Created at {moment(user["user"]["created_at"]).format('LLL')}</p>

          </Card.Body>
        </Card>
      </Col>
    </Row>
    </Container>
  )
}

import { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap'
import { ButtonSending } from '../../components/ButtonSending';
import { requestSSO } from '../../api/Request';
import { useRequest } from '../../hooks/useRequest';
import { useNotifications } from '../../hooks/useNotifications';
import { useHistory } from 'react-router-dom';

export const Register = () => {

  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [sending, setSending] = useState(false);

  const { postRequest } = useRequest();
  const history = useHistory();

  const { addNotification } = useNotifications();
  const onSubmit = async (e: any) => {
    e.preventDefault();

    setSending(true);

    const body = {
      first_name,
      last_name,
      email,
      password,
    };

    const req = await postRequest({ url: '/account/register', title: 'New account', body });
    setSending(false);

    if (req.data) {
      addNotification({
        title: 'Sign up',
        message: 'successfully registered!',
        type: "success",
      });

      onLogin()
    }

  }

  const onLogin = () => {
    history.push('/login')
  }

  return (
    <div className="animate-bottom">
      <Container>
        <Row className="d-flex justify-content-center pt-5">
          <Col xs={12} sm={8} md={4}>
            <Card>
              <Card.Body>

                <h3 className="title text-center pb-4 ">Sign up</h3>
                <Form onSubmit={onSubmit}>

                  <Form.Group >
                    <Form.Label>
                      First name
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter first name"
                      required
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mt-2">
                    <Form.Label>
                      Last name
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter last name"
                      required
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mt-2">
                    <Form.Label>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      title="Enter a valid email"
                      required
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mt-2">
                    <Form.Label>
                      Password
                    </Form.Label>
                    <Form.Control
                      placeholder="Enter passsword"
                      pattern=".{8,15}"
                      type="password"
                      required
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Form.Group>


                  <ButtonSending label="Sign in" sending={sending} className="col-12 mt-3" />
                  <p className="text-center mt-2">
                    Are you already registered? <span
                      style={{ cursor: "pointer", color: "#186bd9" }}
                      onClick={onLogin}
                    >Sign in</span>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

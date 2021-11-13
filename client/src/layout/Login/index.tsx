import React, { useState } from "react";
import { Card, Form, Container, Row, Col } from "react-bootstrap";
import { ButtonSending } from "../../components/ButtonSending";
import { useNotifications } from "../../hooks/useNotifications";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/authReducer";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { RootState } from "../../redux/store";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);

  const { addNotification } = useNotifications();

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store: RootState) => {
    return store.auth;
  });

  useEffect(() => {
    
    if (Object.keys(user["user"]).length !== 0) {
      history.push("/");
    }
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();

    setSending(true);
    dispatch(
      loginAction(email, password, (response: any) => {
        if (response.ok) {
          history.push("/");
        } else {
          addNotification({
            title: "Login",
            message: response.message || "Error in login",
            type: "warning",
          });
        }
        setSending(false);
      })
    );
  };

  const onRegister = ()=>{
    history.push('/register');
  }

  return (
<Container>
<Row className="d-flex justify-content-center pt-5">
  <Col xs={12} sm={8} md={4}>
    <Card>
      <Card.Body>
   
        <h3 className="title text-center pb-4 ">Sign in</h3>
        <Form onSubmit={submit}>
          <Form.Group>
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
              type="password"
              placeholder="password"
              pattern=".{8,15}"
              title="Enter a password of 8 to 15 characters"
              required
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <ButtonSending label="Sign in" sending={sending} className="col-12 mt-3" />
        </Form>

          <p className="text-center mt-2">
          You do not have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "#186bd9" }}
              onClick={onRegister}
            >
              Create an account.
            </span>
          </p>
      </Card.Body>
    </Card>
  </Col>
</Row>
</Container>
  );
};

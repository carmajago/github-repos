import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/authReducer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const NavBarPrimary = () => {

  const user = useSelector((store: RootState) => {
    return store.auth;
  });

  const dispatch = useDispatch();
  const history = useHistory();


  const onLogout = () => {
    dispatch(
      logout(() => {
        history.push('login');
      })
    );
  }
  useEffect(() => {

  }, [user["user"]])

  const onLogin = () => {
    history.push('/login')
  }

  const onSignUp = () => {
    history.push('/register')
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>Hello Build</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/home'>My repositories</Nav.Link>
          </Nav>
          <Nav>
            {(Object.keys(user["user"]).length !== 0) ? (
              <>
                <Nav.Link as={Link} to='/profile'><h5 className="text-light" style={{ marginRight: '10px' }}>Hello {user["user"]["first_name"]}</h5></Nav.Link>
                <Button onClick={onLogout} variant="outline-dark">Log out</Button>
              </>
            ) : (
              <>
              <Button onClick={onSignUp} variant="outline-light" style={{marginRight:'10px'}}>Sign up</Button>
              <Button onClick={onLogin} variant="light">Login</Button>
            </>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

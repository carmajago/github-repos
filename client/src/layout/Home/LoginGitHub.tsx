import { useEffect } from 'react';
import { Loader } from '../../components/Loader';

const {REACT_APP_CLIENT_GITHUB} = process.env;

export const LoginGitHub = () => {


  useEffect(() => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${REACT_APP_CLIENT_GITHUB}`;
  }, []);


  return (
    <Loader></Loader>
   )
}

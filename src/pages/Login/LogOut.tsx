import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// import { Container } from './styles';

const LogOut: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        auth.logOut();
        navigate("/login");

    })
  return <div />;
}

export default LogOut;
import React from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from '../components/Preloader/Preloader';

function ProtectedRoute({ element: Element, ...props }) {

    if (props.isLoading) return <Preloader />;
    if (!props.isLoggedIn) { return <Navigate to="/" /> }
    else { return <Element {...props} /> }

    // return props.isLoggedIn
    //     ? <Element {...props} />
    //     : <Navigate to="/"/>;
};

export default ProtectedRoute;

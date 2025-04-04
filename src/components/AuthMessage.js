import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import DisplayStatus from './DisplayStatus';

function AuthMessage() {
    const { authStatus } = useContext(AuthContext);

    if (authStatus.isAuthenticated) {
        return <DisplayStatus type="success" message={`Welcome, ${authStatus.username}!`} />;
    }

    return null;
}

export default AuthMessage;

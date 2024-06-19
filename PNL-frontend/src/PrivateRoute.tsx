import React from 'react';
import { Navigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import { getToken } from './utilities/Function/GetLocalStorage';
import { Permission } from 'pages/Authentication/Permission';
import { ACCESS } from 'utilities/Constant/ConstantName';

interface Props {
    element: JSX.Element;
    role: string[];
    path?: string;
}

interface DecodedToken {
    role: string;
}
const PrivateRoute: React.FC<Props> = ({ element, role, path }) => {

    const grantPermission = (requestedRoles: any) => {
        const splitToken = getToken()?.split('@')[0];
        const decodedToken = decodeToken(splitToken ?? '') as DecodedToken;
        if (requestedRoles.includes(decodedToken?.role)) return true;
        return false;
    };

    if (!getToken()) {
        return <Navigate to="/login" />;
    }

    if (grantPermission(role)) {
        return element;
    } else {
        return <Permission action={ACCESS}/>;
    }
};

export { PrivateRoute };

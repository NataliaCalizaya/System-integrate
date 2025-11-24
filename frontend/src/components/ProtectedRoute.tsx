import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const authed = isLoggedIn();
    const location = useLocation();

    if (!authed) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
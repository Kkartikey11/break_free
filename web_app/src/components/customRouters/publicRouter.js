import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie"

const cookies = new Cookies();

export const PublicRouter = ({children}) => {

    const isAuthenticated = cookies.get("auth_token");

    if(!isAuthenticated) {
        return children;
    }

    return <Navigate to="/" />;

}
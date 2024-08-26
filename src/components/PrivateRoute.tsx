import { useSelector } from "react-redux";
import { selectToken } from "../store/auth";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { ReactNode } from "react";

interface PrivateRouteProps extends RouteProps {
    children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
    const token = useSelector(selectToken);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/auth/signup",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;

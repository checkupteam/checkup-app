import { useSelector } from "react-redux";
import { selectToken } from "../store/auth";
import { Redirect } from "react-router";

const AuthChecker: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const token = useSelector(selectToken);

    if (!token) {
        return <Redirect to="/auth" />;
    }

    return <>{children}</>;
};

export default AuthChecker;

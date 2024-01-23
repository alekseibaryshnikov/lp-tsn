import {FC, PropsWithChildren} from "react";
import {Navigate} from "react-router-dom";
import LocalStorageService from "@/services/LocalStorage";

const ProtectedRoute: FC<PropsWithChildren> = ({children}) => {
    if (!LocalStorageService.getAuthToken()) {
        return <Navigate to="/login" /> ;
    }

    return <>{children}</>;
}

export default ProtectedRoute;

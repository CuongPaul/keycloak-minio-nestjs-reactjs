import { useKeycloak } from "@react-keycloak/web";
import { Outlet, Navigate } from "react-router-dom";

import { Loading } from "../components";

const PrivateRoutes = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return (
      <div style={{ height: "100vh" }}>
        <Loading />
      </div>
    );
  }

  return keycloak.authenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

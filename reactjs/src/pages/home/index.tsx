import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

import "./index.css";
import { Loading } from "../../components";

const Home = () => {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return (
      <div style={{ height: "100vh" }}>
        <Loading />
      </div>
    );
  }

  return (
    <div className="home__container">
      <header className="home__header">
        <img alt="logo" src={"logo.svg"} className="home__logo" />
        <h1>
          Welcome,{" "}
          {keycloak.authenticated ? keycloak.tokenParsed?.name : "Guest"}
        </h1>
        <button
          className="home__button"
          onClick={() =>
            keycloak.authenticated ? navigate("/profile") : keycloak.login()
          }
        >
          {keycloak.authenticated ? "Profile" : "Login"}
        </button>
      </header>
    </div>
  );
};

export default Home;

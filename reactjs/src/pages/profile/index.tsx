import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

import "./index.css";

const Profile = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}`, {
        headers: { Authorization: `Bearer ${keycloak.token}` },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, [keycloak.token]);

  return (
    <div className="profile__container">
      <div className="profile__card">
        <div className="card__avatar">
          <img
            alt="avatar"
            onClick={() => keycloak.accountManagement()}
            src={
              keycloak.tokenParsed?.avatar || "images/a-boy-simple-avatar.webp"
            }
          />
        </div>
        <div className="card__title">{keycloak.tokenParsed?.name}</div>
        <div className="card__subtitle">{keycloak.tokenParsed?.email}</div>
        <div className="card__button-group">
          <button className="card__btn" onClick={() => navigate("/")}>
            Home
          </button>
          <button
            onClick={() => keycloak.logout()}
            className="card__btn card__btn-solid"
          >
            Logout
          </button>
        </div>
      </div>
      <ul className="profile__background">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default Profile;

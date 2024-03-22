import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Ref, useRef, useState, useEffect } from "react";

import "./index.css";

const Profile = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const fileRef: Ref<any> = useRef(null);
  const [avatarImage, setAvatarImage] = useState(keycloak.tokenParsed?.avatar);

  const handleChangeFile = async (e: any) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);

    if (avatarImage) {
      const bucketName = "bucket-demo";
      const endIndex = avatarImage.indexOf("?X-Amz-Algorithm=");
      const startIndex =
        avatarImage.indexOf(`/${bucketName}/`) + `/${bucketName}/`.length;

      await axios.delete(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/file?name=${avatarImage.substring(startIndex, endIndex)}`
      );
    }

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/file`,
      formData
    );
    setAvatarImage(data.data.urls[0]);

    axios.post(
      `${process.env.REACT_APP_KEYCLOAK_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/account`,
      {
        email: keycloak.tokenParsed?.email,
        attributes: { avatar: data.data.urls[0] },
        firstName: keycloak.tokenParsed?.given_name,
        lastName: keycloak.tokenParsed?.family_name,
      },
      { headers: { Authorization: `Bearer ${keycloak.token}` } }
    );
  };

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
          <input
            type="file"
            ref={fileRef}
            accept=".png, .jpg, .jpeg"
            onChange={handleChangeFile}
            style={{ display: "none" }}
          />
          <img
            alt="avatar"
            onClick={() => fileRef.current.click()}
            src={avatarImage || "images/simple-avatar.png"}
          />
        </div>
        <div
          className="card__title"
          onClick={() => keycloak.accountManagement()}
        >
          {keycloak.tokenParsed?.name}
        </div>
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

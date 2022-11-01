import React, { useState, useMemo, useCallback, useContext } from "react";
import "../Pages/Profile.css";
import { useDropzone } from "react-dropzone";
import FormProfile from "../form_components/FormProfile";
import img from "./dullAvatar.png";

export default function Profile() {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className="account">
      <div className="account-info">
        <h1>Profile</h1>
        <p>
          You can set preferred display name, create your profile and other
          personal settings.
        </p>
      </div>
      <div className="account-box">
        <div className="account-box-img" {...getRootProps()}>
          <input {...getInputProps()} />
          <img
            src={img}
            alt="account upload"
            width={150}
            height={150}
            className="account-box-img-img"
          />
          <p className="account-box-img-text">Change Profile Picture</p>
        </div>
        <div className="account-box-form">
          <FormProfile />
        </div>
      </div>
    </div>
  );
}

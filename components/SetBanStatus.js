import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase/app";
import "firebase/database";
import { fetchDataFromFirestore } from "../pages/api/firebase.users.js";

const SetBanStatus = ({ username }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(username);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataFromFirestore()
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleBan = () => {
    console.log("User banned");
    setIsBanned(true);
    firebase
      .database()
      .ref(`${collectionPath}/${username}`)
      .update({ isBanned: true });
  };

  const handleUnban = () => {
    console.log("User unbanned");
    setIsBanned(false);
    firebase
      .database()
      .ref(`${collectionPath}/${username}`)
      .update({ isBanned: false });
  };

  return (
    <>
      <button onClick={isBanned ? handleUnban : handleBan}>
        <FontAwesomeIcon
          data-bs-toggle="modal"
          data-bs-target="#banConfirmationModal"
        />
        {isBanned ? "Unban User" : "Ban User"}
      </button>
      {userData && <div>User Information: {JSON.stringify(userData)}</div>}
    </>
  );
};

export default SetBanStatus;

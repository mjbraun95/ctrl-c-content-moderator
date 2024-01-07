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
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleBan = () => {
    console.log("User banned");
    setIsBanned(true);
    firebase.database().ref(`users/${username}`).update({ ban_status: true });
  };

  const handleUnban = () => {
    console.log("User unbanned");
    setIsBanned(false);
    firebase.database().ref(`users/${username}`).update({ ban_status: false });
  };

  return (
    <td className="py-4">
      <FontAwesomeIcon
        data-bs-toggle="modal"
        data-bs-target="#banConfirmationModal"
        icon={faXmarkCircle}
        onClick={isBanned ? handleUnban : handleBan}
      />
    </td>
  );
};

export default SetBanStatus;

{
  /* <button onClick={ban_status ? handleUnban : handleBan}>
        <FontAwesomeIcon
          data-bs-toggle="modal"
          data-bs-target="#banConfirmationModal"
        />
        {isBanned ? "Unban User" : "Ban User"}
      </button> */
}

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../pages/api/firebase.config.js"; // Import Firestore instance
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore functions
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const SetBanStatus = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [isBanned, setIsBanned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      const userRef = doc(db, "users", username); // Reference to the user document
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            setIsBanned(docSnap.data().ban_status);
          } else {
            console.log("No such document!");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setLoading(false);
        });
    }
  }, [username]);

  const handleBanStatusChange = (newStatus) => {
    console.log(newStatus ? "User banned" : "User unbanned");
    setIsBanned(newStatus);
    const userRef = doc(db, "users", username);
    updateDoc(userRef, { ban_status: newStatus });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <td className="py-4">
      <FontAwesomeIcon
        data-bs-toggle="modal"
        data-bs-target="#banConfirmationModal"
        icon={faXmarkCircle}
        onClick={() => handleBanStatusChange(!isBanned)}
      />
    </td>
  );
};

export default SetBanStatus;

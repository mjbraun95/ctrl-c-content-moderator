import React, { useState } from "react";

const SetBanStatus = ({ status }) => {
  const [isBanned, setIsBanned] = useState(status);

  const handleBan = () => {
    console.log("User banned");
    setIsBanned(true);
  };

  const handleUnban = () => {
    console.log("User unbanned");
    setIsBanned(false);
  };

  return (
    <button onClick={isBanned ? handleUnban : handleBan}>
      {isBanned ? "Unban User" : "Ban User"}
    </button>
  );
};

export default SetBanStatus;

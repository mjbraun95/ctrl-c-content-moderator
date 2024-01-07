import React, { useState } from "react";

const SetKickStatus = ({ status }) => {
  const [isKicked, setIsKicked] = useState(status);

  const handleKick = () => {
    console.log("User kicked");
    setIsKicked(true);
  };

  const handleUnkick = () => {
    console.log("User unkicked");
    setIsKicked(false);
  };

  return (
    <button onClick={isKicked ? handleUnkick : handleKick}>
      {isKicked ? "Unkick User" : "Kick User"}
    </button>
  );
};

export default SetKickStatus;

import React from "react";

function TimeFormatter({ timestamp }) {
  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formattedTime = formatTime(timestamp);

  return <td className="py-4"> {formattedTime} </td>;
}

export default TimeFormatter;
